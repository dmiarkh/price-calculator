export const graphData = [
  {
    name: 'backblaze',
    logoURL: '../images/backblaze.png',
    companyColor: '#dd031e',
    minPayment: 7,
    storageRate: 0.005,
    transferRate: 0.01,
    totalPrice: 0,
    isLowestPrice: false,
  },
  {
    name: 'bunny',
    logoURL: '../images/bunny.png',
    companyColor: '#f88137',
    maxPayment: 10,
    storageRate: [
      {
        name: 'HDD',
        price: 0.01,
        isSelected: true
      },
      {
        name: 'SSD',
        price: 0.02,
        isSelected: false
      }
    ],
    transferRate: 0.01,
    totalPrice: 0,
    isLowestPrice: false,
  },
  {
    name: 'scaleway',
    logoURL: '../images/scaleway.png',
    companyColor: '#4b0a83',
    storageRate: [
      {
        name: 'single',
        price: 0.03,
        isSelected: true
      },
      {
        name: 'multi',
        price: 0.06,
        isSelected: false
      }
    ],
    transferRate: 0.02,
    freePlan: 75,
    totalPrice: 0,
    isLowestPrice: false,
  },
  {
    name: 'vultr',
    logoURL: '../images/vultr.png',
    companyColor: '#047cff',
    minPayment: 5,
    storageRate: 0.01,
    transferRate: 0.01,
    totalPrice: 0,
    isLowestPrice: false,
  }
]