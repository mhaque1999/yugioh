export function getImageUrl(cardName) {
    const firstLetter = cardName.charAt(0).toUpperCase();
  
    let baseUrl;
  
    if (firstLetter >= 'A' && firstLetter <= 'M') {
      baseUrl = 'https://mhaque1999.github.io/yugiohimagea-m/images/';
    } else if (firstLetter >= 'N' && firstLetter <= 'R') {
      baseUrl = 'https://mhaque1999.github.io/yugiohimagen-r/images/';
    } else if (firstLetter >= 'S' && firstLetter <= 'Z') {
      baseUrl = 'https://mhaque1999.github.io/yugiohimages-z/images/';
    } else {
      // If the first letter is not a letter (e.g., number or symbol), default to the S-Z folder
      baseUrl = 'https://mhaque1999.github.io/yugiohimages-z/images/';
    }
  
    const imageName = cardName.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with '_'
    return `${baseUrl}${imageName}.jpg`;
  }
  