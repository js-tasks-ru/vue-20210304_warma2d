<template>
  <div class="form-section form-section_inner">
    <button @click="$emit('remove')" type="button" class="remove-button">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button
        v-model="localAgendaItem.type"
        title="Тип"
        :options="$options.agendaItemTypeOptions" />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="item in selectedOptions"
      :label="item.title"
      :key="item.field"
    >
      <component
        v-bind="item.props"
        v-model="localAgendaItem[item.field]"
        :is="item.component"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import AppIcon from './AppIcon';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypeOptions,
  getAgendaItemLanguageOptions,
} from '../MeetupService';

export default {
  name: 'MeetupAgendaItemForm',
  components: { FormGroup, AppIcon, AppInput, DropdownButton },
  agendaItemTypeOptions: getAgendaItemTypeOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  languageOptions: getAgendaItemLanguageOptions(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  data(){
    return {
      localAgendaItem: null,
    }
  },

  computed: {
    selectedOptions() {
      return this.$options.fieldSpecifications[this.localAgendaItem.type]
    }
  },

  created() {
    this.localAgendaItem = {...this.agendaItem}
  },

  watch: {
    localAgendaItem: {
      handler(val) {
        this.$emit('update:agendaItem', {...val})
      },
      deep:true,
    },

    'localAgendaItem.startsAt'(val, oldVal) {
      if (oldVal) {
        let delta = this.getMicroSeconds(val)-this.getMicroSeconds(oldVal)
        let newEndNumber = this.getMicroSeconds(this.localAgendaItem.endsAt) + delta
        this.localAgendaItem.endsAt = this.microSecondsToTime(newEndNumber)
      }
    },
  },

  methods: {
    getMicroSeconds(stringTime) {
      if (!stringTime) return 0
      let array = stringTime.split(':');
      return (parseInt(array[0], 10) * 60 * 60 * 1000) + (parseInt(array[1], 10) * 60 * 1000)
    },

    microSecondsToTime(microSeconds) {
      let d = new Date(microSeconds)
      let hours = String(d.getUTCHours())
      if (hours.length < 2) {
        hours = '0'+hours
      }
      let minutes = String(d.getUTCMinutes())
      if (minutes.length < 2) {
        minutes = '0'+minutes
      }
      return hours+':'+minutes
    }
  },
};
</script>

<style></style>
