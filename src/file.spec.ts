/**
 * @jest-environment jsdom
 */

import { downloadFile, downloadFileByHttp } from "./file";

describe("downloadFile", () => {
  it("should success download a file.", () => {
    // given
    const mockUrl = "https://test-url.com";
    const mockLink = {
      href: "",
      setAttribute: jest.fn(),
      click: jest.fn(),
    };
    const mockBlob = { size: 1024, type: "application/pdf" };
    const mockData = "data";
    const mockFileName = "test.pdf";
    window.URL.createObjectURL = jest.fn(() => mockUrl);
    document.createElement = jest.fn(
      () => mockLink as unknown as HTMLAnchorElement
    );
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    const blobSpy = jest
      .spyOn(global, "Blob")
      .mockImplementation(() => mockBlob as unknown as Blob);

    // when
    downloadFile(mockData, mockFileName);

    // then
    expect(blobSpy).toHaveBeenCalledTimes(1);
    expect(blobSpy).toHaveBeenCalledWith([mockData]);

    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith("a");

    expect(mockLink.href).toEqual(mockUrl);

    expect(mockLink.setAttribute).toHaveBeenCalledTimes(1);
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      "download",
      mockFileName
    );

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);

    expect(mockLink.click).toHaveBeenCalledTimes(1);

    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
  });
});

describe("downloadFileByHttp", () => {
  it("should success download a file.", async () => {
    // given
    const mockUrl = "https://test-url.com";
    const mockLink = {
      href: "",
      download: "",
      click: jest.fn(),
      remove: jest.fn(),
    };
    const mockBlob = { size: 1024, type: "application/pdf" };
    const mockData = "data";
    const mockFileName = "test.pdf";
    window.URL.createObjectURL = jest.fn(() => mockUrl);
    document.createElement = jest.fn(
      () => mockLink as unknown as HTMLAnchorElement
    );
    document.body.appendChild = jest.fn();
    window.fetch = jest.fn(async () => {
      const response: Response = {
        blob: jest.fn(async () => mockBlob as unknown as Blob),
      } as any;
      return response;
    });

    // when
    await downloadFileByHttp(mockData, mockFileName);

    // then
    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith("a");

    expect(mockLink.href).toEqual(mockUrl);
    expect(mockLink.download).toEqual(mockFileName);

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);

    expect(mockLink.click).toHaveBeenCalledTimes(1);
    expect(mockLink.remove).toHaveBeenCalledTimes(1);
  });
});
