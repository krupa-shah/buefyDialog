<template>
  <div v-if="isOpen" class="dialog modal is-active">
    <div class="modal-background" @click="backgroundToggle"></div>
    <div class="modal-card">
      <div>
        <header class="modal-card-head">
          <p class="modal-card-title" align="left">
            {{ labels.dlgLabel.title }}
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="$emit('open', false)"
          />
        </header>
        <section class="modal-card-body">
          <label class="label" align="left"
            >{{ labels.dlgLabel.name
            }}<span class="star-location">*</span></label
          >
          <p class="control">
            <input
              ref="input-name"
              class="input"
              autocomplete="off"
              :class="{ 'is-danger': errors.has('name') }"
              name="name"
              type="text"
              :placeholder="labels.placeholder.name"
              v-validate="{ required: true, regex: charValidation(), max: 32 }"
              v-model="component.name"
              v-focus
            />
          </p>
          <p class="help is-danger">
            <span>{{ errors.first("name") }}</span>
          </p>

          <!-- Project description field -->
          <b-field :label="labels.dlgLabel.description" align="left">
            <b-input
              type="textarea"
              name="prtDescription"
              v-model="component.description"
              maxlength="256"
              :placeholder="labels.placeholder.description"
            />
          </b-field>
          <!-- Number field -->
          <label class="label" align="left">{{
            labels.dlgLabel.contactNumber
          }}</label>
          <!-- Number input -->
          <b-field>
            <b-input
              type="text"
              name="number"
              v-model="component.number"
              expanded
              :placeholder="labels.placeholder.contactNumber"
              v-validate="'numeric'"
            />
          </b-field>
          <p class="help is-danger">
            <span>{{ errors.first("number") }}</span>
          </p>
          <label class="label" align="left">{{
            labels.dlgLabel.comments
          }}</label>
          <p class="control">
            <!-- Use RegEx for validating comments string, set max length to 5 as DDM service demands -->
            <input
              class="input"
              autocomplete="off"
              :class="{ 'is-danger': errors.has('revision') }"
              name="comments"
              type="text"
              :placeholder="labels.placeholder.comments"
              v-validate="{ required: false, regex: charValidation() }"
              v-model="component.comments"
            />
          </p>
          <p class="help is-danger">
            <span>{{ errors.first("comments") }}</span>
          </p>
        </section>
        <footer class="modal-card-foot btm-pad16 rigth-pad16">
          <button class="button" type="button" @click="$emit('open', false)">
            {{ labels.dlgLabel.closeButton }}
          </button>
          <button
            class="button is-primary"
            type="button"
            :disabled="disableSaveCreation"
            @click="acceptDialog()"
          >
            {{ labels.dlgLabel.actionButton }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
let closeOnEscape;
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/hashtag";
import "vue-awesome/icons/cube";

export default {
  name: "SaveAsCreateNewDialog",
  components: {
    Icon
  },
  props: {
    open: {
      type: Boolean,
      required: true
    },
    backgroundClick: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Object,
      default: () => {
        return {
          placeholder: {
            name: "Part Name",
            description: "Geogrophical Description",
            contactNumber: "Enter contact number",
            comments: "Comments"
          },
          dlgLabel: {
            title: "Hello World!",
            name: "Place",
            description: "Geogrophical Description",
            contactNumber: "Contact Number",
            comments: "Comments",
            closeButton: "Close",
            actionButton: "Submit"
          }
        };
      }
    }
  },
  data() {
    return {
      assignProjectNumber: 0,
      component: {
        name: "",
        description: "",
        number: "",
        comments: "A"
      },
      activeTab: 0
    };
  },
  created() {
    /* istanbul ignore else */
    if (typeof window !== "undefined") {
      /* istanbul ignore next */
      document.addEventListener(
        "keyup",
        (closeOnEscape = event => {
          /* istanbul ignore next */
          if (event.keyCode === 27) this.$emit("open", false);
        })
      );
    }
  },
  beforeDestroy() {
    document.removeEventListener("keyup", closeOnEscape);
  },
  computed: {
    disableSaveCreation() {
      return this.errors.count() > 0;
    },
    isOpen() {
      return this.open;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    backgroundToggle() {
      if (this.backgroundClick) {
        this.$emit("open", false);
      }
    },

    charValidation() {
      return "^[a-zA-Z][a-zA-Z0-9 _\\.-]*$";
    },

    acceptDialog() {
        this.$emit("accept", this.component);
    },
  }
};
</script>
<style lang="scss" scoped>
.modal .modal-card {
  width: 100%;
}
/*
  Ensure there is room for the help text to prevent
  the field size from changeing when an validation
  error is reported.
 */

.help.is-danger {
  min-height: 1.5em;
}

.icon-color-secondary {
  color: purple;
}
.modal-card-head {
  background-color: purple;
}
.star-location {
  color:red;
}
.modal-card-title {
  color: white;
}
</style>
