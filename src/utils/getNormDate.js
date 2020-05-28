import moment from 'moment';

const getNormDate = (createdAt) => {
  const today = moment().startOf('date').format();
  const thisYear = moment().startOf('year').format();

  if (createdAt >= today) return 'Today';
  if (createdAt < today && createdAt > thisYear)
    return moment(createdAt).format('Do MMMM');
  if (createdAt < thisYear) return moment(createdAt).format('Do MMMM YYYY');

  return '';
};

export default getNormDate;
