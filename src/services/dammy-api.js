export default class DummyChapiService {
  _messages = [
    {
      id: 0,
      user: 'John',
      time: 1584704588070,
      text: 'Hello, Dolly! THis is Luis, darling',
      isMy: false
    },
    {
      id: 1,
      user: 'Ann',
      time: 1584704615708,
      text: 'Hi, John! Wasap bro?',
      isMy: true
    },
    {
      id: 2,
      user: 'John',
      time: 1584704615808,
      text: 'I just call to say...',
      isMy: false
    },
    {
      id: 3,
      user: 'Ann',
      time: 1584704625808,
      text: 'Pleease, stop it.',
      isMy: true
    },
    {
      id: 4,
      user: 'John',
      time: 1584704625998,
      text: 'Weeeeell...',
      isMy: false
    },
    {
      id: 5,
      user: 'Ann',
      time: 1584704626998,
      text: "I'm warning you!",
      isMy: true
    },
    {
      id: 6,
      user: 'John',
      time: 1584704637998,
      text: 'Ok, ok, just jocking..',
      isMy: false
    }
  ];

  // Get messages
  getAllMessages = async () => {
    return this._messages;
    // return [];
  };
}
