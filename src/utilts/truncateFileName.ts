const truncateFileName = (fileName: string, maxLength: number) => {
  if (fileName.length <= maxLength) return fileName;
  const extIndex = fileName.lastIndexOf(".");
  const extension = fileName.substring(extIndex);
  const name = fileName.substring(0, extIndex);
  return `${name.substring(0, maxLength)}...${extension}`;
};

export default truncateFileName;
