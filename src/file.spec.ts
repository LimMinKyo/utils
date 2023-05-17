/**
 * @jest-environment jsdom
 */

import { downloadFile } from "./file";

describe("downloadFile", () => {
  it("should success download a file.", () => {
    // given
    const setAttribute = jest.fn();
    const click = jest.fn();
    const testUrl = "https://test-url.com";
    const link = {
      href: "",
      setAttribute,
      click,
    };
    const mockBlob = { size: 1024, type: "application/pdf" };
    const mockData = "data";
    const mockFileName = "test.png";
    window.URL.createObjectURL = jest.fn(() => testUrl);
    document.createElement = jest.fn(() => link as any);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    const blobSpy = jest
      .spyOn(global, "Blob")
      .mockImplementation(() => mockBlob as any);

    // when
    downloadFile(mockData, mockFileName);

    // then
    expect(blobSpy).toHaveBeenCalledTimes(1);
    expect(blobSpy).toHaveBeenCalledWith([mockData]);

    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith("a");

    expect(link.href).toEqual(testUrl);

    expect(setAttribute).toHaveBeenCalledTimes(1);
    expect(setAttribute).toHaveBeenCalledWith("download", mockFileName);

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(document.body.appendChild).toHaveBeenCalledWith(link);

    expect(link.click).toHaveBeenCalledTimes(1);

    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledWith(link);
  });
});
