const cron = require('node-cron');
const { BookingService } = require('../../services');

function cronSchedule(){  
    cron.schedule('*/30 * * * * *', async () => {
        await BookingService.cancelOldBookings();
    })
}

module.exports = {
    cronSchedule    
}
