import { paths, Regions } from "./paths"

interface DistrictData {
  color?: string,
  descriptions?: string
}

interface MapOptions {
  width?: number,
  height?: number,
  targetSelector: string,
  descriptions?: {
    [key: string]: string;
  },
  colors?: {
    [key: string]: string;
  },
  data?: {
    [key in Regions]: DistrictData
  }
}

class NZMapSVG {
  options: MapOptions;

  // Element tags
  wrapper: any; //<div>
  mapImage: any; //<svg>
  descriptionDisplay: any //<p>

  constructor(options: MapOptions) {
    this.options = options;
  }

  // Add other methods here
  render() {
    if (
      !document.querySelector(`#${this.options.targetSelector}`)
    ) {
      this.error('Target element not found');
    }

    // <svg> inside <div id='map'>
    this.wrapper = document.querySelector(`#${this.options.targetSelector}`);
    this.mapImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    this.wrapper.appendChild(this.mapImage);

    this.mapImage.setAttribute('viewBox', '0 0 701.42358 988.42462');
    this.mapImage.setAttribute('fill', 'white');
    this.mapImage.setAttribute('stroke', 'black');
    this.mapImage.classList.add('svgMap-map-image');

    // descriptionDisplay p tag
    this.descriptionDisplay = document.createElement('p');
    this.descriptionDisplay.setAttribute('style', 'font-size: 80px');
    this.wrapper.appendChild(this.descriptionDisplay);


    // <path> inside <svg>
    for (let regionID in paths) {
      var regionData = paths[regionID];
      if (!regionData.d) {
        return;
      }

      var regionElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      regionElement.setAttribute('d', regionData.d);
      regionElement.setAttribute(
        'id',
        regionID
      );
      regionElement.setAttribute('data-id', regionID);
      regionElement.classList.add('svgMap-country');

      // render in specific colours:
      regionElement.setAttribute('fill', this.options.colors[regionID]);
      this.mapImage.appendChild(regionElement);

      // Test for hover code:
      regionElement.addEventListener(
        'mouseover',
        (e) => {
          let regionID = e.target.id;
          let regionDescription = this.options.descriptions[regionID];
          this.descriptionDisplay.textContent = regionID +': '+ regionDescription
        }
      );
    }
  }

  error(error) {
    throw new Error(`svgMap error: ${error || 'Unknown error'}`)
  };
}


// Example usage
const options = {
  targetSelector: "map",
  descriptions: {
    'AUK': "Thinks rest of NZ doesn't exist",
    'STL': "100km/hr, is that the minimum speed?",
    'OTA': "There are summer clothes, and.. summer clothes",
    'WGN': "Everyone I know lives in a shed",
    'WKO': "The Secret Cow Level in Diablo was inspired by us",
    'BOP': "Too many retired people from Auckland",
    'GIS': "How do I get a job? Lets go to Auckland",
    'HKB': "Money don't grow on trees. Nope but apples do, and apples is $$",
    'NTL': "The rest of NZ is too cold",
    'CAN': "We're NZ's biggest city, Auckland doesn't count"
  },
  colors: {
    'AUK': 'blue',
    'OTA': 'yellow',
    'WGN': 'red'
  },
  data: {
    auk: {
      color: "123"
    }
  }
}
const map = new NZMapSVG(options)
// Then call other methods on map
map.render();
