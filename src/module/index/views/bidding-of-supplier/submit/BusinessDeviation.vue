<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div>
          <button type="button" class="btn btn-primary" @click="config.show = true">
            添加商务偏离
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr>
              <th style="width: 10px">#</th>
              <th>招标文件条目</th>
              <th>商务条款</th>
              <th>偏离</th>
              <th>说明</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>1</td>
              <td>1.1</td>
              <td>xxxxxx</td>
              <td>xxxx</td>
              <td>xxxxx</td>
              <td>
                <a>删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <BusinessDeviationForm :config="config"></BusinessDeviationForm>
  </section>
</template>

<script>
import BusinessDeviationForm from './BusinessDeviationForm'

export default {
  components: {
    BusinessDeviationForm
  },
  data: function () {
    return {
      config: {
        show: false,
        title: '添加商务偏离'
      }
    }
  },
  methods: {
  }
}
</script>
