export const getBoundary = (contentType: string) =>
  contentType.replace(/multipart\/form\-data\; boundary\=/gi, '')
