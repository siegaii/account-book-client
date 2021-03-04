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
  Input,
  Table,
  TableColumn,
  Message
} from 'element-ui';

export function registerElement() {
  Vue.use(Button)
    .use(Input)
    .use(Dialog)
    .use(DatePicker)
    .use(Radio)
    .use(Select)
    .use(Option)
    .use(Table)
    .use(TableColumn)
    .use(Form)
    .use(FormItem);
}

Vue.prototype.$message = Message;
