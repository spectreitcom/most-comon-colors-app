export const isJPEG = file => file.type === 'image/jpeg';

export const isPNG = file => file.type === 'image/png';

export const isFileSizeGreaterThan = (file, sizeKB) => {
    return Math.round(file.size / 1024) > sizeKB;
}

export const copyToClipboard = text => {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.append(input);
    input.focus();
    input.select();
    document.execCommand("copy");
    input.remove();
};