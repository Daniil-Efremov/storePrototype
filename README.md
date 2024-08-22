# storePrototype

## На сайте реализованы:

1. Стилизация с помощью Bootstrap 5.
1. Адаптивная вёрска.
1. Получение данных от БД через fetch().
1. Генерация контента на сонове даных из БД.
1. Поиск сгенерированного контента по двум параметрам(название товара и тип).
1. Страница, контент которой генерируется на основании параметров URL.

## Структура БД

_Таблица имеет следующие поля:_
1. id(int, primarry key, auto increment)
1. name(VARCAHR 255)
1. type(VARCAHR 255)
1. description(TEXT 500)
1. price(int 11)
1. img(VARCAHR 255)

## Примечания

_Информация для заполнения БД бралась с сайта:_ [Первый мебельный](https://pm.ru/)

_Следующие функции поланировались, но я не успел их реализовать:_
1. Страница добавления товаров.
1. Корзина с использованием local storage.
1. Офрмление заказа товаров, помещённых в корзину.
1. Страница просмора оформленных заказов.