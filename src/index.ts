const REGION_IDS = ["auk", "bop", "can", "cit", "gis", "hkb", "mwt", "mbh", "nsn", "ntl", "ota", "stl", "tki", "tas", "wko", "wgn", "wtc"]

interface DistrictData {
  color: string
  description?: string
}

interface MapOptions {
  width?: number,
  height?: number,
  data?: {
    [key in typeof REGION_IDS[number]]: DistrictData
  }
}

class NZMapSVG {
  options: MapOptions

  constructor(options: MapOptions) {
    this.options = options
  }

  // Add other methods here
}


// Example usage
const options = {
  data: {
    auk: {
      color: "123"
    }
  }
}
const map = new NZMapSVG(options)
// Then call other methods on map
