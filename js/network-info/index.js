export default class NetworkInfo {
  constructor() {
    this.netinfo = navigator.connection;

    this.netinfo.addEventListener('typechange', () => this.getConnectionType());
  }

  static connectionTypes() {
    return {
      'bluetooth': 'A Bluetooth connection.',
      'cellular': 'A cellular connection (e.g., EDGE, HSPA, LTE, etc.)',
      'ethernet': 'An Ethernet connection.',
      'none': 'No network connection. The user agent will not contact the network when the user follows links or when a script requests a remote page (or knows that such an attempt would fail) - i.e., equivalent to navigator.onLine === false in HTML.',
      'mixed': 'The user agent is using multiple connection types.',
      'other': 'The connection type that is known, but not one of enumerated connection types.',
      'unknown': 'The user agent has established a network connection, but is unable, or unwilling, to determine the underlying connection technology.',
      'wifi': 'A Wi-Fi connection.',
      'wimax': 'A WiMAX connection.',
    }
  }

  static effectiveConnectionTypes() {
    return {
      'slow-2g': 'The network is suited for small transfers only such as text-only pages.',
      '2g': 'The network is suited for transfers of small images.',
      '3g': 'The network is suited for transfers of large assets such as high resolution images, audio, and SD video.',
      '4g': 'The network is suited for HD video, real-time video, etc.'
    };
  }

  getConnectionType() {
    const type = this.netinfo.type,
          ct = NetworkInfo.connectionTypes(),
          regex = new RegExp('(bluetooth|cellular|ethernet|none|mixed|other|unknown|wifi|wimax)');

    regex.test(type) ? console.info(ct[type]) : console.error('Something went wrong');

    this.selectTableRow(type);
  }

  getEffetciveConnectionType() {
    const effectiveType = this.netinfo.effectiveType,
          ect = NetworkInfo.effectiveConnectionTypes(),
          regex = new RegExp('(slow-2g|2g|3g|4g)');

    regex.test(effectiveType) ? console.info(ect[effectiveType]) : console.error('Something went wrong');
  }

  selectTableRow(type) {
    const selectorDataConnection = document.querySelectorAll('[data-connection]');
    const selectors = [...selectorDataConnection];

    selectors.forEach(selector => {
      if (selector.dataset.connection === type) {
        selector.style.color = "green";
        selector.style.fontWeight = "bold";
      }
      else {
        selector.style.color = "black";
        selector.style.fontWeight = "normal";
      }
    });
  }
}
