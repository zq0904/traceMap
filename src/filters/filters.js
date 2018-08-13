import moment from 'moment'

export const time = (item, format) => moment(item).format(format)
