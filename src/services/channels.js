import { axiosClient } from '../lib/axios';
import moment from 'moment-timezone'

export const getChannels = async ({ token }) => {
    var res = await axiosClient.post('/apps/canaisV2', {
        subscription_id: 0,
        token,
    });

    //console.log(res.data.canais)

    var newCanais = GerarListaCanais(res.data.canais)

    return { data: { canais: newCanais } }
};

export function GerarListaCanais(channel) {
    //"GerarListaCanais ATUALIZANDOOOOOOOO"
    var newListaCannel = []
    datetime = moment().unix()
    _agora = datetime - 1600000000
    //console.log(_agora)

    for (let i = 0; i < channel.length; i++) {
        const element = channel[i];
        var channelAtual = {
            num: channel[i].num,
            nome: channel[i].nome,
            epg_id: channel[i].epg_id,
            logo: channel[i].logo,
            url: channel[i].url,
            id: i,
        }
        channelAtual.agora = "Sem título"
        channelAtual.depois = "Sem título"
        channelAtual.inicio = "0000-00-00 00:00:00.000Z"
        channelAtual.fim = "0000-00-00 00:00:00.000Z"
        channelAtual.descnow = ""
        channelAtual.descnext = ""
        channelAtual.ratingNow = "0"
        channelAtual.ratingNext = "0"
        channelAtual.tsStart = 0
        channelAtual.tsStop = 0



        for (let e = 0; e < channel[i].programacion.length; e++) {
            initProg = channel[i].programacion[e].tsStart - 1600000000
            if (_agora > initProg) {
                //console.log(_agora)

                if (e + 1 <= channel[i].programacion.length - 1) {
                    depoisInit = channel[i].programacion[e + 1].tsStart - 1600000000
                    //console.log(_agora, depoisInit)
                    if (_agora < depoisInit) {
                        channelAtual.agora = channel[i].programacion[e].title
                        channelAtual.depois = channel[i].programacion[e + 1].title

                        //console.log(channel[i].programacion[e].inicio, channel[i].programacion[e + 1].inicio)
                        channelAtual.inicio = channel[i].programacion[e].inicio
                        channelAtual.fim = channel[i].programacion[e + 1].inicio

                        channelAtual.descnow = channel[i].programacion[e].descnow
                        channelAtual.descnext = channel[i].programacion[e + 1].descnow
                        channelAtual.ratingNow = channel[i].programacion[e].ratingNow
                        channelAtual.ratingNext = channel[i].programacion[e + 1].ratingNow

                        channelAtual.tsStart = channel[i].programacion[e].tsStart
                        channelAtual.tsStop = channel[i].programacion[e].tsStop
                    }
                }
            }
        }
        newListaCannel.push(channelAtual)
    }
    return newListaCannel
}
