const getDateAtTime = (time: string, date: Date) => {
  const [hour, minute] = time.split(":");
  return date.setHours(Number(hour), Number(minute));
};

export default getDateAtTime;
