const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success === true) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

const getStocksTable = () =>
  ApiConnector.getStocks((response) => {
    if (response.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });

getStocksTable();

setInterval(() => getStocksTable(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Успешно выполнено");
    } else {
      moneyManager.setMessage(!response.success, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) =>
  ApiConnector.convertMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Успешно выполнено");
    } else {
      moneyManager.setMessage(!response.success, response.error);
    }
  });

moneyManager.sendMoneyCallback = (data) =>
  ApiConnector.transferMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Успешно выполнено");
    } else {
      moneyManager.setMessage(!response.success, response.error);
    }
  });

const favWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success === true) {
    favWidget.clearTable();
    favWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success === true) {
      favWidget.clearTable();
      favWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favWidget.setMessage(response.success, "Успешно выполнено");
    } else {
      favWidget.setMessage(!response.success, response.error);
    }
  });
};

favWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success === true) {
      // console.log(response);
      favWidget.clearTable();
      favWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favWidget.setMessage(response.success, "Успешно выполнено");
    } else {
      favWidget.setMessage(!response.success, response.error);
    }
  });
};
