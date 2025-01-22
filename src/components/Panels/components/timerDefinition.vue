<!--  -->
<template>
  <strong class="form-label">TIMER DEFINITION</strong>
  <!-- <div>
    <P class="form-label">Type</P>
    <select
      name="timerType"
      class="form-select"
      style="margin: 6px 0px"
      :value="target.properties.timerType"
      @change="change"
    >
      <option value="timeDuration">延迟触发</option>
    </select>
  </div> -->
  <div>
    <el-tag type="primary" class="mb10">Type</el-tag>
  </div>
  <div>
    <el-select
      v-model="target.properties.timerType"
      placeholder="Select"
      style="width: 240px"
      @change="change"
    >
      <el-option :label="'延迟触发'" :value="'timeDuration'" />
    </el-select>
  </div>
  <!-- <p class="form-label">Value</p>
  <input
    autocomplete="off"
    style="margin: 6px 0px"
    :value="target.properties.timerValue"
    id="name-input"
    type="text"
    class="form-control"
    @input="input"
  /> -->
  <el-tag type="primary" class="mb10 mt10">Value</el-tag>
  <el-input
    v-model="target.properties.timerValue"
    placeholder="请输入Value"
    @input="input"
    clearable
  />
  <div style="width: 250px">
    <div v-if="timerType === 'timeDuration'">
      <p>例如：15, 单位秒</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const target: any = inject('target');
const timerType = ref(target.value.properties.timerType || '');

function change(val: any) {
  target.value.setProperties({
    // timerType: e.target.value
    timerType: val
  });
  // timerType.value = e.target.value;
  timerType.value = val;
}

function input(val: any) {
  // const time = Number(e.currentTarget.value);
  const time = Number(val);
  if (isNaN(time)) {
    alert('请输入有效数字');
    return;
  }
  target.value.setProperties({
    timerValue: time
  });
}
</script>
