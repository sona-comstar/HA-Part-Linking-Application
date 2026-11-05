// src/global.d.ts or src/types/usb.d.ts
declare interface USBDevice {
    usbVersionMajor: number;
    usbVersionMinor: number;
    usbVersionSubminor: number;
    deviceClass: number;
    deviceSubclass: number;
    deviceProtocol: number;
    vendorId: number;
    productId: number;
    deviceVersionMajor: number;
    deviceVersionMinor: number;
    deviceVersionSubminor: number;
    manufacturerName?: string;
    productName?: string;
    serialNumber?: string;
    configuration?: USBConfiguration;
    configurations: USBConfiguration[];
    opened: boolean;
    open(): Promise<void>;
    close(): Promise<void>;
    selectConfiguration(configurationValue: number): Promise<void>;
    claimInterface(interfaceNumber: number): Promise<void>;
    releaseInterface(interfaceNumber: number): Promise<void>;
    selectAlternateInterface(interfaceNumber: number, alternateSetting: number): Promise<void>;
    controlTransferIn(setup: USBControlTransferParameters, length: number): Promise<USBInTransferResult>;
    controlTransferOut(setup: USBControlTransferParameters, data?: BufferSource): Promise<USBOutTransferResult>;
    transferIn(endpointNumber: number, length: number): Promise<USBInTransferResult>;
    transferOut(endpointNumber: number, data: BufferSource): Promise<USBOutTransferResult>;
    isochronousTransferIn(endpointNumber: number, packetLengths: number[]): Promise<USBIsochronousInTransferResult>;
    isochronousTransferOut(endpointNumber: number, data: BufferSource, packetLengths: number[]): Promise<USBIsochronousOutTransferResult>;
    reset(): Promise<void>;
  }
  
  declare interface USBConfiguration {
    configurationValue: number;
    configurationName?: string;
    interfaces: USBInterface[];
  }
  
  declare interface USBInterface {
    interfaceNumber: number;
    alternate: USBAlternateInterface;
    alternates: USBAlternateInterface[];
    claimed: boolean;
  }
  
  declare interface USBAlternateInterface {
    alternateSetting: number;
    interfaceClass: number;
    interfaceSubclass: number;
    interfaceProtocol: number;
    interfaceName?: string;
    endpoints: USBEndpoint[];
  }
  
  declare interface USBEndpoint {
    endpointNumber: number;
    direction: USBDirection;
    type: USBEndpointType;
    packetSize: number;
  }
  
  declare type USBDirection = 'in' | 'out';
  declare type USBEndpointType = 'bulk' | 'interrupt' | 'isochronous';
  
  declare interface USBControlTransferParameters {
    requestType: USBRequestType;
    recipient: USBRecipient;
    request: number;
    value: number;
    index: number;
  }
  
  declare type USBRequestType = 'standard' | 'class' | 'vendor';
  declare type USBRecipient = 'device' | 'interface' | 'endpoint' | 'other';
  
  declare interface USBInTransferResult {
    data?: DataView;
    status: USBTransferStatus;
  }
  
  declare interface USBOutTransferResult {
    bytesWritten: number;
    status: USBTransferStatus;
  }
  
  declare interface USBIsochronousInTransferResult {
    data?: DataView;
    packets: USBInTransferResult[];
  }
  
  declare interface USBIsochronousOutTransferResult {
    packets: USBOutTransferResult[];
  }
  
  declare type USBTransferStatus = 'ok' | 'stall' | 'babble';