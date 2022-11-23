import moment from 'moment-timezone';

export function dataFormaterTS(data) {
  if (data == '') {
    return '';
  } else {
    var tz = moment.tz.guess();
    if (tz == 'America/Sao_Paulo') {
      var a = moment.utc(data);
      return moment(a).unix();
    } else {
      const time = moment.tz(data.replace(' ', 'T'), 'America/Sao_Paulo');
      const localtz = moment.tz.guess();
      const datet = time.clone().tz(localtz);
      return moment(datet).unix();
    }
  }
}

export function dataFormater(data) {
  if (data == '') {
    return '';
  } else {
    var tz = moment.tz.guess();
    if (tz == 'America/Sao_Paulo') {
      var a = moment.utc(data);
      return a.utc().format('HH:mm');
    } else {
      const time = moment.tz(data.replace(' ', 'T'), 'America/Sao_Paulo');
      const localtz = moment.tz.guess();
      const datet = time.clone().tz(localtz);
      const formatDate = moment(datet).format('HH:mm');
      return formatDate;
    }
  }
}
export function sizeBar(channel) {
  if (channel?.inicio) {
    var _inicio = dataFormaterTS(channel?.inicio) - 1600000000;
    var _final = dataFormaterTS(channel?.fim) - 1600000000;
    var _agora = moment().utc(true).unix() - 1600000000;

    var tempoTotal = _final - _inicio;
    var tempoDecorrido = _final - _agora;

    var porcento = (tempoDecorrido * 100) / tempoTotal;
    /* //console.log("INICIO: ", _inicio)
     //console.log("FIM: ", _final)
     //console.log("AGORA: ", _agora, moment())
     //console.log("PORCENTO: ", 100 - porcento)  */
    var w = 100 - porcento;

    if (w <= 0) {
      w = 0;
    } else if (w >= 100) {
      w = 100;
    }
    if (w) {
      return w;
    } else {
      return 0;
    }
  }

  return 0;
}
