async function includeHeader(headerFilePath, targetElementId) {
  try {
    const response = await fetch(headerFilePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const headerHTML = await response.text();
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.innerHTML = headerHTML;
    } else {
      console.error(`Element with ID "${targetElementId}" not found.`);
    }
  } catch (error) {
    console.error("Failed to include header:", error);
  }
}
// Usage example:
includeHeader('header.html', 'header-container');