const axios = require('axios');

const stationId = '6751ae72af28d84937830061'; 
const baseUrl = 'http://localhost:5001/api/station/daily_update';

function generateRandomEnergy() {
  return Math.floor(Math.random() * 1000) + 100;
}

function getDatesForLastTwoMonths() {
  const dates = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 2);
  // startDate.setHours(0, 0, 0, 0); 

  for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  return dates;
}

async function postDailyEnergyData(date, energyProduced) {
  try {
    const response = await axios.post(baseUrl, {
      stationId,
      date: date.toISOString().split('T')[0],
      energyProduced,
    });
    console.log(`Posted for ${date.toISOString().split('T')[0]}: ${energyProduced} kWh`);
  } catch (error) {
    console.error(`Error posting for ${date.toISOString().split('T')[0]}:`, error.message);
  }
}

async function generateAndPostData() {
  const dates = getDatesForLastTwoMonths();
  for (const date of dates) {
    const energyProduced = generateRandomEnergy();
    await postDailyEnergyData(date, energyProduced);
  }
}

generateAndPostData().then(() => {
  console.log('Data generation and posting complete.');
});
