window.downloadFile = (fileName, bytes, contentType) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([bytes], { type: contentType }));
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
};