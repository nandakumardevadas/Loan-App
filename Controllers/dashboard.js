class DashboardController {
    get Dashboard() {
        return function(req, res, next) {
            res.send('Dashboard');
        }
    }
}

module.exports = new DashboardController();