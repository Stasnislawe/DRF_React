<h1 align="center">DRF + React</h1>
<p>Бэкэнд на джанго, фронтенд на react, через api с использованием django-rest-framework с документацией swagger</p>
<p>Создана простая модель книги с полями:
  <ul>
    <li>ID - айди</li>
    <li>title - название книги</li>
    <li>added_at - время публикации</li>
    <li>time_to_read - среднее время прочтения</li>
    <li>text - текст, содержимое</li>
    <li>cover - обложка книги(изображение)</li>
    <li>author - автор</li>
  </ul>
</p>
<p>И сериалайзер с вьюхой:
  <p>Вьюха содержит функцию:</p>
  <ul>
    <li>get - получение данных по входным данным</li>
    <li>create - добавление данных</li>
    <li>update - изменение данных</li>
  </ul>
</p>
<h2 align="center">Запуск для тестирования</h2>
<p>понадбится 2 терминала, один для бэкэнда джанго, другой для фронта на реакте</p>
<h3>Терминал бля джанго</h3>
<p>создаем виртуальную среду</p>
<p>устанавливаем все зависимости - pip install -r requirements.txt</p>
<p>далее переходим в корневую папку бэкэнд части - cd project</p>
<p>делаем миграцию - python manage.py makemigrations, python manage.py migrate</p>
<p>запускаем сервер - python manage.py runserver</p>
<h3>Терминал для реакт</h3>
<p>переходим в папку фронтенда - cd frontend</p>
<p>загружаем и устанавливаем пакеты - npm install</p>
<p>после установки могут возникнуть ошибки - npm audit fix --force</p>
<p>запускаем фронт - npm run dev</p>
<p>заходим на - http://localhost:5173/</p>
<img src="https://github.com/user-attachments/assets/b227c21b-f57c-4b44-a754-e890ec8ddb04">
<p>можно нажать на книгу для чтения ее текста</p>
<img src="https://github.com/user-attachments/assets/6856c954-cd96-4d18-afc5-c61bade406aa">
<p>для добавления или изменения данных переходим на - http://127.0.0.1:8000/book/</p>
<p>документация сваггер - http://127.0.0.1:8000/swagger-ui/</p>
<img src="https://github.com/user-attachments/assets/eaec7407-bb41-4668-a5c7-f80e08907c29">
