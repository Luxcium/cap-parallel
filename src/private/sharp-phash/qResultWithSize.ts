const getSize =
  'x001:81KB:82508:/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/jpgs_ipn_impt_2022-02-04/photo_447@03-02-2022_13-22-16.jpg'
    .split(':')
    .slice(2)[0];
console.log(Number(getSize) || -1);
export {};
