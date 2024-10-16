export const users = [
  {
    id: 'asndfaiwejasf',
    username: 'johnd',
    password: '',
    email: 'user2@gmail.com',
    createdAt: '2024-10-14T00:00:00Z',
  },
  {
    id: 'nkioijefafai',
    username: 'graviton',
    password: '',
    email: 'gravity@gmail.com',
    createdAt: '2024-10-15T00:00:00Z',
  },
];

export const habits = [
  {
    id: 'wlwkwioijkasdfasi',
    userId: 'asndfaiwejasf',
    name: 'Read a book',
    description: "Read Cal Newport's Deep Work, for 30minutes after work",
    startDate: new Date('2024-09-16T00:00:00Z'),
    durationInDays: 5,
    createdAt: '2024-10-16T00:00:00Z',
    updatedAt: '2024-10-16T00:00:00Z',
  },
  {
    id: 'ksdflafo2ioiewjwef',
    userId: 'asndfaiwejasf',
    name: 'Do morning workout',
    description:
      'I want to workout everymorning. Workout include 500 reps of jump rope',
    startDate: new Date('2024-10-01T00:00:00Z'),
    durationInDays: 10,
    createdAt: '2024-10-16T00:00:00Z',
    updatedAt: '2024-10-16T00:00:00Z',
  },
  {
    id: '00ajsldkfajsijwe',
    userId: 'asndfaiwejasf',
    name: "Review learning materials on 'Duck side stream' ",
    description:
      'Review the learning materials I own for the Duck side stream that is about to take place in a few days time. The essence is to get myself as ready as I can be for this. This is important',
    startDate: new Date('2024-10-03T00:00:00Z'),
    durationInDays: 3,
    createdAt: '2024-10-16T00:00:00Z',
    updatedAt: '2024-10-16T00:00:00Z',
  },

  {
    id: 'kaksidfnasdf2223kjsd',
    userId: 'nkioijefafai',
    name: 'practice speaking english',
    description: 'practice speaking english with my language buddies',
    startDate: new Date('2024-10-03T00:00:00Z'),
    durationInDays: 7,
    createdAt: '2024-10-16T00:00:00Z',
    updatedAt: '2024-10-16T00:00:00Z',
  },
];

export const habitDays = [
  {
    id: 'knwkneasdi',
    habitId: 'kaksidfnasdf2223kjsd',
    originalStartDate: new Date('2024-10-03T00:00:00Z'),
    date: '2024-10-05T00:00:00Z',
    isCompleted: true,
    createdAt: '2024-10-05T00:00:00Z',
    updatedAt: '2024-10-05T00:00:00Z',
  },
  {
    id: 'm2i2ji2iidasd',
    habitId: '00ajsldkfajsijwe',
    originalStartDate: new Date('2024-10-03T00:00:00Z'),
    date: '2024-10-05T00:00:00Z',
    isCompleted: true,
    createdAt: '2024-10-05T00:00:00Z',
    updatedAt: '2024-10-05T00:00:00Z',
  },
];
