import Papa from 'papaparse';

export async function getRoupaByCategoria() {
    const order = "https://raw.githubusercontent.com/Data-Science-Research/edital_avaliacao/main/order.csv";
    const mainCategory = "https://raw.githubusercontent.com/Data-Science-Research/edital_avaliacao/main/mainCategory.csv"

    function getOrderCsv() {
        try {
            const response = fetch(order);
            const csvData = response.text();
            const jsonData = csvData => {
                const jsonData = Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true
                });
                //acessar o resultado com jsonData.data
            }
        } catch (error) {
            console.error('Error fetching or parsing the CSV file:', error);
        }
    };

    function getMainCategoryCsv() {
        try {
            const response = fetch(mainCategory);
            const csvData = response.text();
            const jsonData = csvData => {
                const jsonData = Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true
                });
                //acessar o resultado com jsonData.data
            }
        } catch (error) {
            console.error('Error fetching or parsing the CSV file:', error);
        }
    };

};

//--------------------------
export async function getClothesByModel() {
  const clothesByModelQuery = {
    dimensions: [
      'order.`page 2 (clothing model)`',
    ],
    measures: [
      'order.count'
    ],
    filters: [ {
      member: 'order.`page 2 (clothing model)`',
      operator: 'set'
    } ],

  };

  const resultSet = await cubeApi.load(acquisitionsByYearQuery);

  return resultSet.tablePivot().map(row => ({
    year: parseInt(row['Artworks.yearAcquired']),
    count: parseInt(row['Artworks.count'])
  }));
}

export async function getDimensions() {
  const dimensionsQuery = {
    dimensions: [
      'Artworks.widthCm',
      'Artworks.heightCm'
    ],
    measures: [
      'Artworks.count'
    ],
    filters: [
      {
        member: 'Artworks.classification',
        operator: 'equals',
        values: [ 'Painting' ]
      },
      {
        member: 'Artworks.widthCm',
        operator: 'set'
      },
      {
        member: 'Artworks.widthCm',
        operator: 'lt',
        values: [ '500' ]
      },
      {
        member: 'Artworks.heightCm',
        operator: 'set'
      },
      {
        member: 'Artworks.heightCm',
        operator: 'lt',
        values: [ '500' ]
      }
    ]
  };

  const resultSet = await cubeApi.load(dimensionsQuery);

  return resultSet.tablePivot().map(row => ({
    width: parseInt(row['Artworks.widthCm']),
    height: parseInt(row['Artworks.heightCm']),
    count: parseInt(row['Artworks.count'])
  }));
}
