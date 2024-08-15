import {useState} from 'react';
import moment from 'moment';
import { Ilist, IProps, IDateTimeProps } from './common/types';

function DateTimePrettyFoo<T extends IDateTimeProps > (Component:React.ComponentType<T>) {
  return function (props: T) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const date1 = moment(props.date);
        const date2 = moment(now);

        const getDiff  = (a:moment.Moment, b:moment.Moment) => {
          let res:number ;
            if (+(b.diff(a, 'years')) >= 1) {
              res = b.diff(a, 'years')
              return `${res} года назад`
            } else if(+(b.diff(a, 'months')) >= 1){
              res = b.diff(a, 'months')
              return `${res} месяцев назад`
            } else if(+(b.diff(a, 'days')) >= 1){
              res = b.diff(a, 'days')
              return `${res} дней назад`
            } else if(+(b.diff(a, 'hours')) >= 1){
              res = b.diff(a, 'hours')
              return `${res} часов назад`
            } else if(+(b.diff(a, 'minutes')) >= 1){
              res = b.diff(a, 'minutes')
              return `${res} минут назад`
            }
            return 'now'
        }
        let diff = getDiff(date1, date2)
        return <Component {...props} date={diff} /> 
  }
}

const DateTimePretty = DateTimePrettyFoo(DateTime);

function DateTime(props: {date:string}) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props: Ilist) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props: IProps) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2022-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}