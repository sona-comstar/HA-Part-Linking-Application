import { Component, OnDestroy, OnInit } from '@angular/core';
import { PartNumberService } from '../part-number.service';
import { MessageService } from 'primeng/api';
import { Subscription, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PartNumberLU01A1Service } from '../part-number-lu01-a1.service';

interface PartNumberFields {
  lu0101: string;
}
@Component({
  selector: 'app-add-lu01a1',
  templateUrl: './add-lu01a1.component.html',
  styleUrl: './add-lu01a1.component.css'
})
export class AddLu01a1Component implements OnInit, OnDestroy {
  partNumbers: PartNumberFields = {
    lu0101: ''
  };

  enableSecond: boolean = false;
  enableThird: boolean = false;
  checkingDuplicates: boolean = false;
  todayCount: number = 0;
  autoSaveTimer: Subscription | null = null;
  timeLeft: number = 0;
  isProcessingScan: boolean = false;
  currentField: keyof PartNumberFields = 'lu0101';
  isSubmitting: boolean = false;


  readonly prefix1: string = 'P11-P09082-01:S';
  readonly minimumValueAfterPrefix1 = 25079;
  // readonly prefix2: string = 'P-00176928B.1M';
  // readonly prefix3: string = 'P-00176171C.1M';
  // readonly minimumValueAfterPrefix3 = 25084;
  readonly totalLength: number = 30;

  constructor(
    private partService: PartNumberLU01A1Service,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getTodayCount();
    this.focusCurrentField();
  }

  ngOnDestroy(): void {
    this.clearAutoSaveTimer();
  }

  onInput(fieldName: keyof PartNumberFields): void {
    const prefix = this.getPrefixForField(fieldName);
    const inputElement = document.getElementById(fieldName) as HTMLInputElement;
    if (inputElement) {
      this.handleScannerInput(inputElement.value, prefix, fieldName);
    }
  }

  onEnter(fieldName: keyof PartNumberFields): void {
    const prefix = this.getPrefixForField(fieldName);
    const inputElement = document.getElementById(fieldName) as HTMLInputElement;
    if (inputElement) {
      this.processScannedValue(inputElement.value, prefix, fieldName);
    }
  }

  private getPrefixForField(fieldName: keyof PartNumberFields): string {
    switch(fieldName) {
      case 'lu0101': return this.prefix1;
      default: return '';
    }
  }

  handleScannerInput(value: string, prefix: string, fieldName: keyof PartNumberFields): void {
    if (!value || this.isProcessingScan) return;
  
    if (value.length === this.totalLength) {
      setTimeout(() => {
        this.processScannedValue(value, prefix, fieldName);
      }, 50);
    }
  }
  
  handleEnterKey(event: KeyboardEvent, prefix: string, fieldName: keyof PartNumberFields): void {
    event.preventDefault();
    const inputElement = event.target as HTMLInputElement;
    this.processScannedValue(inputElement.value, prefix, fieldName);
  }
  

  processScannedValue(scannedValue: string, prefix: string, fieldName: keyof PartNumberFields): void {
    if (this.isProcessingScan || !scannedValue) return;
    this.isProcessingScan = true;

    // Validate length
    if (scannedValue.length !== this.totalLength) {
      this.showError(`Must be exactly ${this.totalLength} characters`);
      this.resetField(fieldName);
      return;
    }

    // Validate prefix
    if (!scannedValue.startsWith(prefix)) {
      this.showError(`Must start with ${prefix}`);
      this.resetField(fieldName);
      return;
    }

    // Validate suffix
    const suffix = scannedValue.substring(prefix.length);
    if (!/^\d+$/.test(suffix)) {
      this.showError(`Only numbers allowed after prefix`);
      this.resetField(fieldName);
      return;
    }

    // Check duplicates
    this.checkingDuplicates = true;
    this.partService.checkDuplicate(fieldName, scannedValue).pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe({
      next: (exists) => {
        if (exists) {
          this.showError(`${fieldName} already exists! or ${fieldName} Grinding Data Not Found`);
          this.resetField(fieldName);
        } else {
          this.partNumbers[fieldName] = scannedValue;
          // this.updateFieldStates();
          this.moveToNextField(fieldName);
        }
      },
      error: (err) => {
        this.showError('Error checking duplicates');
        console.error(err);
        this.resetField(fieldName);
        this.checkingDuplicates = false
      },
      complete: () => {
        this.checkingDuplicates = false;
        this.isProcessingScan = false;
      }
    });
  }

  moveToNextField(currentField: keyof PartNumberFields): void {
    if (this.isAllValid()) {
      // this.showSuccess('All parts scanned! Auto-saving...');
      this.checkForAutoSave();
    }
  }

  focusCurrentField(): void {
    setTimeout(() => {
      const element = document.getElementById(this.currentField) as HTMLInputElement;
      if (element) {
        element.focus();
        element.select();
      }
    }, 50);
  }

  resetField(fieldName: keyof PartNumberFields): void {
    this.partNumbers[fieldName] = '';
    const element = document.getElementById(fieldName) as HTMLInputElement;
    if (element) element.value = '';
    // this.updateFieldStates();
    this.clearAutoSaveTimer();
    this.isProcessingScan = false;
    this.currentField = fieldName;
    this.focusCurrentField();
  }

  checkForAutoSave(): void {
    if (this.isAllValid()) {
      this.clearAutoSaveTimer();
      this.isSubmitting = true; // Disable inputs
      this.timeLeft = 3;
      
      this.autoSaveTimer = timer(0, 1000).subscribe({
        next: (elapsed) => {
          this.timeLeft = 0;
          if (elapsed == 0) this.submitData();
        },
        complete: () => {
          this.autoSaveTimer = null;
        }
      });
    } else {
      this.clearAutoSaveTimer();
      this.isSubmitting = false; 
    }
  }

  clearAutoSaveTimer(): void {
    if (this.autoSaveTimer) {
      this.autoSaveTimer.unsubscribe();
      this.autoSaveTimer = null;
    }
    this.timeLeft = 0;
  }

  submitData(): void {
    this.clearAutoSaveTimer();
    this.partService.savePart(this.partNumbers).subscribe({
      next: () => {
        this.showSuccess('Parts saved successfully!');
        this.resetForm();
        this.getTodayCount();
        this.isSubmitting = false;
      },
      error: (err) => {
        if (err.status === 409) {
          // this.showError('Duplicate part number detected');
        } else {
          this.showError('Failed to save parts: ' + err.message);
        }
        this.resetForm();
        this.isSubmitting = false;
      }
    });
  }

  // Validation methods
  isFirstValid(): boolean {
    const input = this.partNumbers.lu0101;
  
    // Check basic prefix and total length
    if (!input.startsWith(this.prefix1) || input.length !== this.totalLength) {
      return false;
    }
  
    // Extract 5 digits immediately after the prefix
    const afterPrefix = input.substring(this.prefix1.length, this.prefix1.length + 5);
  
    // Check if it's all digits and greater than minimum
    const isValidNumber = /^\d{5}$/.test(afterPrefix) && parseInt(afterPrefix, 10) > this.minimumValueAfterPrefix1;
  
    return isValidNumber;
  }


  // isSecondValid(): boolean {
  //   return this.partNumbers.ha01s3.startsWith(this.prefix2) && 
  //          this.partNumbers.ha01s3.length === this.totalLength &&
  //          /^\d+$/.test(this.partNumbers.ha01s3.substring(this.prefix2.length));
  // }


  // isThirdValid(): boolean {
  //   const input = this.partNumbers.ha0101;
  
  //   // Check basic prefix and total length
  //   if (!input.startsWith(this.prefix3) || input.length !== this.totalLength) {
  //     return false;
  //   }
  
  //   // Extract 5 digits immediately after the prefix
  //   const afterPrefix = input.substring(this.prefix3.length, this.prefix3.length + 5);
  
  //   // Check if it's all digits and greater than minimum
  //   const isValidNumber = /^\d{5}$/.test(afterPrefix) && parseInt(afterPrefix, 10) > this.minimumValueAfterPrefix3;
  
  //   return isValidNumber;
  // }
  
  isAllValid(): boolean {
    return this.isFirstValid();
  }

  // updateFieldStates(): void {
  //   this.enableSecond = this.isFirstValid();
  //   this.enableThird = this.isSecondValid();
  // }

  resetForm(): void {
    this.clearAutoSaveTimer();
    this.partNumbers = { lu0101: ''};
    this.currentField = 'lu0101';
    this.focusCurrentField();
  }

  getTodayCount(): void {
    this.partService.getCountToday().subscribe((count: number) => {
      this.todayCount = count;
    });
  }

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
  }
}