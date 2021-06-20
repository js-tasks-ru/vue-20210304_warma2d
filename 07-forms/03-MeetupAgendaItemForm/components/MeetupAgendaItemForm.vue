<template>
  <div class="form-section form-section_inner">
    <button @click="$emit('remove')" type="button" class="remove-button">
      <app-icon icon="trash" />
    </button>

    <div class="form-group">
      <select v-model="localAgendaItem.type" class="form-control" title="Тип">
        <option v-for="item in agendaItemTypes" :key="item.value" :value="item.value">{{ item.text }}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input ref="startInput" v-model="localAgendaItem.startsAt" class="form-control" type="time" placeholder="00:00" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input ref="endInput" v-model="localAgendaItem.endsAt" class="form-control" type="time" placeholder="00:00" />
        </div>
      </div>
    </div>

    <div v-show="localAgendaItem.type === talkType" class="form-group">
      <label class="form-label">Тема</label>
      <input v-model="localAgendaItem.title" class="form-control" />
    </div>
    <div v-show="localAgendaItem.type === talkType" class="form-group">
      <label class="form-label">Докладчик</label>
      <textarea v-model="localAgendaItem.speaker" class="form-control"></textarea>
    </div>
    <div v-show="localAgendaItem.type === talkType" class="form-group">
      <label class="form-label">Описание</label>
      <textarea v-model="localAgendaItem.description" class="form-control"></textarea>
    </div>
    <div v-show="localAgendaItem.type === talkType" class="form-group">
      <label class="form-label">Язык</label>
      <select v-model="localAgendaItem.language" class="form-control">
        <option v-for="item in languages" :key="item.value" :value="item.value">{{ item.text }}</option>
      </select>
    </div>

    <div v-show="localAgendaItem.type === otherType" class="form-group">
      <label class="form-label">Заголовок</label>
      <input v-model="localAgendaItem.title" class="form-control" />
    </div>
    <div v-show="localAgendaItem.type === otherType" class="form-group">
      <label class="form-label">Описание</label>
      <textarea v-model="localAgendaItem.description" class="form-control"></textarea>
    </div>

    <div v-show="localAgendaItem.type !== talkType && localAgendaItem.type !== otherType" class="form-group">
      <label class="form-label">Нестандартный текст (необязательно)</label>
      <input v-model="localAgendaItem.title" class="form-control" />
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppIcon },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  data(){
    return {
      localAgendaItem: null,
      startTimeNumber: null,
      endTimeNumber: null,
    }
  },

  computed: {
    agendaItemTypes() {
      return getAgendaItemTypes()
    },

    talkType() {
      return 'talk'
    },

    otherType() {
      return 'other'
    },

    languages() {
      return getTalkLanguages()
    },
  },

  watch: {
    localAgendaItem: {
      handler(val) {
        this.$emit('update:agendaItem', val)
      },
      deep:true,
    },

    startTimeNumber(newStart, oldStart) {
      let delta = this.endTimeNumber - oldStart
      let newEndTimeNumber = delta + newStart
      this.$refs.endInput.valueAsNumber = newEndTimeNumber
    },
  },

  updated() {
    if (this.$refs.startInput) {
      this.startTimeNumber = this.$refs.startInput.valueAsNumber
      this.endTimeNumber = this.$refs.endInput.valueAsNumber
    }
  },

  created() {
    this.localAgendaItem = {...this.agendaItem}
  },
};
</script>

<style></style>
