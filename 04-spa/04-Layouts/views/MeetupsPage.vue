<template>
  <div class="transition-list meetups-list">
    <a href="meetup-description.html" class="meetups-list__item">
      <div class="meetups-list__col">
        <div class="meetups-list__cover"><h5>Демо-Митап</h5></div>
      </div>
      <div class="meetups-list__col">
        <div class="meetups-list__description">
          <span class="meetups-list__badge">Организую</span>
          <ul class="info-list">
            <li>
              <img alt="icon" src="icons/icon-user.svg" class="icon info-list__icon" />
              Demo Organizer
            </li>
            <li>
              <img alt="icon" src="icons/icon-map.svg" class="icon info-list__icon" />
              Internet
            </li>
            <li>
              <img alt="icon" src="icons/icon-cal-lg.svg" class="icon info-list__icon" />
              <time datetime="Mon Jul 13 2020 23:15:59 GMT+0500 (Екатеринбург, стандартное время)">
                13 июля 2020 г.
              </time>
            </li>
          </ul>
        </div>
      </div>
    </a>
    <a href="meetup-description.html" class="meetups-list__item">
      <div class="meetups-list__col">
        <div class="meetups-list__cover"><h5>VueJS Course</h5></div>
      </div>
      <div class="meetups-list__col">
        <div class="meetups-list__description">
          <span class="meetups-list__badge meetups-list__badge_success">Участвую</span>
          <ul class="info-list">
            <li>
              <img alt="icon" src="icons/icon-user.svg" class="icon info-list__icon" />
              Grigorii K. Shartsev
            </li>
            <li>
              <img alt="icon" src="icons/icon-map.svg" class="icon info-list__icon" />
              learn.javascript.ru
            </li>
            <li>
              <img alt="icon" src="icons/icon-cal-lg.svg" class="icon info-list__icon" />
              <time datetime="Mon Jun 15 2020 05:00:00 GMT+0500 (Екатеринбург, стандартное время)">
                15 июня 2020 г.
              </time>
            </li>
          </ul>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MeetupsPage',
};
</script>

<style scoped></style>
