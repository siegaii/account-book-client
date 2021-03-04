import Vue from 'vue';
import {
  Button,
  Dialog,
  Select,
  Option,
  Form,
  FormItem,
  DatePicker,
  Radio,
  Input
} from 'element-ui';

export function registerElement() {
  Vue.use(Button)
    .use(Input)
    .use(Dialog)
    .use(DatePicker)
    .use(Radio)
    .use(Select)
    .use(Option)
    .use(Form)
    .use(FormItem);
}
