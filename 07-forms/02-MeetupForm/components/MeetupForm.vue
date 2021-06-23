<template>
  <form @submit.prevent="handleSubmit" class="form meetup-form">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label>Название</label>
          <input v-model="localMeetup.title" class="form-control" />
        </div>
        <div class="form-group">
          <label>Дата</label>
          <input v-model="localMeetup.date" class="form-control" type="date" />
        </div>
        <div class="form-group">
          <label>Место</label>
          <input v-model="localMeetup.place" class="form-control" />
        </div>
        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="localMeetup.description" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Изображение</label>
          <image-uploader v-model="localMeetup.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(item, index) in localMeetup.agenda"
        :key="index"
        :agendaItem="item"
        class="mb-3"
        @remove="removeItem(index)"
        @update:agendaItem="updateItem($event, index)"
      />

      <div class="form-section_append">
        <button @click="addAgendaItem" type="button" data-test="addAgendaItem">+ Добавить этап программы</button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <button @click="$emit('cancel')" class="button button_secondary button_block" type="button" data-test="cancel">Отмена</button>
        <button class="button button_primary button_block" type="submit" data-test="submit">{{submitText}}</button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';
import _ from 'lodash';

let lastId = -1;
function createAgendaItem() {
  return {
    id: lastId--,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
    },
  },

  data() {
    return {
      localMeetup: {
        title: null,
        date: null,
        place: null,
        description: null,
        imageId: null,
        agenda: [],
      }
    }
  },

  created() {
    this.localMeetup = _.cloneDeep(this.meetup)
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', _.cloneDeep(this.localMeetup))
    },

    addAgendaItem() {
        let newItem = createAgendaItem()
        let lastItem = null
        let lastItemKey = -1

        if (this.localMeetup.agenda.length > 0) {
          lastItemKey = this.localMeetup.agenda.length-1
          lastItem = this.localMeetup.agenda[lastItemKey]
        }

        if (lastItem) {
          newItem.startsAt = lastItem.endsAt
        }

        this.localMeetup.agenda.splice(++lastItemKey, 0, newItem)
      },

    // addAgendaItem() {
    //   this.localMeetup.agenda.push(createAgendaItem())
    //
    //   let lastItemKey = this.localMeetup.agenda.length-1
    //   let lastItem = this.localMeetup.agenda[lastItemKey]
    //   let penultItem = null
    //   if (this.localMeetup.agenda.length > 1) {
    //     penultItem = this.localMeetup.agenda[lastItemKey-1]
    //   }
    //   if (penultItem) {
    //     lastItem.startsAt = penultItem.endsAt
    //   }
    //
    //   this.$set(this.localMeetup.agenda, lastItemKey, lastItem)
    // },

    removeItem(index) {
      this.localMeetup.agenda.splice(index, 1)
    },

    updateItem(item, index) {
      this.$set(this.localMeetup.agenda, index, item)
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
