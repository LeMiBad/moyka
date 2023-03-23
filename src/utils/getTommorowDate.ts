export const getTomorrowDate = () => {
    const today = new Date(); // получаем сегодняшнюю дату
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // добавляем 1 день
    const year = tomorrow.getFullYear(); // получаем год
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0'); // получаем месяц и добавляем ноль в начало, если месяц < 10
    const day = tomorrow.getDate().toString().padStart(2, '0'); // получаем день и добавляем ноль в начало, если день < 10
    const hours = '00';
    const minutes = '00';
    const seconds = '00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}