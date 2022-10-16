import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Item, ListData, Card, ListPager } from 'src/app/@core/data/listData';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@core/state/app.state';
import { getFurnitures } from 'src/app/@core/state/furniture/furniture.selector';
import { Furniture } from 'src/app/@core/models/furniture.interface';
import { loadFurnitures } from 'src/app/@core/state/furniture/furniture.actions';
import { FurnitureData } from 'src/app/@core/models/furnitureData.interface';
import { FurnituresData } from 'src/app/@core/models/furnituresData.interface';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { UserService } from 'src/app/@core/services/user/user.service';
import { User } from 'src/app/@core/models/user.model';
import { loadFurnitureRequests } from 'src/app/@core/state/furnitureRequest/furnitureRequest.actions';
import { getFurnitureRequests } from 'src/app/@core/state/furnitureRequest/furnitureRequest.selector';
import { FurnitureRequest } from 'src/app/@core/models/furnitureRequest.interface';
import { FurnitureRequestData } from 'src/app/@core/models/furnitureRequestData.interface';

@Injectable()
export class ListDataService extends ListData {
  furnitures: Furniture[];
  furnitureRequests: FurnitureRequest[];

  constructor(private authService: AuthService, private userService: UserService, private store: Store<AppState>) {
    super();
    this.furnitures = [];
    this.furnitureRequests = [];
  }

  private basicData: Item[] = [
    {
      id: '230000200706283786',
      title: 'Yriqtjdjd Omvqxe Xxlfgjtnj Hsyf Qecu',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Shirley Martin',
      status: 'Stuck',
      timeline: '1985-01-10',
      children: [
        {
          id: '230000197101025982',
          title: 'Volbp Wdobo Ukme Szbgjmeo Kobn Aawyirm Rmbobdyn',
          priority: 'Low',
          iteration: 'iteration',
          assignee: 'Daniel Martinez',
          status: 'Done',
          timeline: '2008-08-02',
        },
        {
          id: '230000197101025982',
          title: 'Volbp Wdobo Ukme Szbgjmeo Kobn Aawyirm Rmbobdyn',
          priority: 'Low',
          iteration: 'iteration',
          assignee: 'Daniel Martinez',
          status: 'Done',
          timeline: '2008-08-02',
          children: [
            {
              id: '22000019860224174X',
              title: 'Ozhtyax Wfpp Essvpkjrx Havonov Cdcmgmggnj Vqwcwd Ooolirn',
              priority: 'High',
              iteration: 'iteration',
              assignee: 'Margaret Clark',
              status: '',
              timeline: '2015-05-08',
            },
            {
              id: '140000197907226183',
              title: 'Govfunhwa Gkvcrv Uvbq Gqyrwntx Ofnnuwrnh',
              priority: 'Low',
              iteration: 'iteration',
              assignee: 'Jason Rodriguez',
              status: 'Done',
              timeline: '1994-02-08',
            },
            {
              id: '440000201807134089',
              title: 'Rbh Wklmth Xkeg Iuzan Isufy',
              priority: 'Medium',
              iteration: 'iteration',
              assignee: 'Kenneth Robinson',
              status: 'Done',
              timeline: '2017-02-04',
            },
          ],
        },
        {
          id: '520000200110166246',
          title: 'Rrqcneg Iknm Tbo',
          priority: 'Medium',
          iteration: 'iteration',
          assignee: 'Paul Hernandez',
          status: 'Stuck',
          timeline: '2017-02-01',
        },
      ],
    },
    {
      id: '710000197203093702',
      title: 'Hwgx Vkdg Kfap Tke Miyxg Hyelo',
      priority: 'Low',
      iteration: 'iteration',
      assignee: 'Michael Walker',
      status: 'Stuck',
      timeline: '2018-08-04',
    },
    {
      id: '230000197101025982',
      title: 'Volbp Wdobo Ukme Szbgjmeo Kobn Aawyirm Rmbobdyn',
      priority: 'Low',
      iteration: 'iteration',
      assignee: 'Daniel Martinez',
      status: 'Done',
      timeline: '2008-08-02',
    },
    {
      id: '520000200110166246',
      title: 'Rrqcneg Iknm Tbo',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Paul Hernandez',
      status: 'Stuck',
      timeline: '2017-02-01',
    },
    {
      id: '22000019860224174X',
      title: 'Ozhtyax Wfpp Essvpkjrx Havonov Cdcmgmggnj Vqwcwd Ooolirn',
      priority: 'High',
      iteration: 'iteration',
      assignee: 'Margaret Clark',
      status: '',
      timeline: '2015-05-08',
    },
    {
      id: '140000197907226183',
      title: 'Govfunhwa Gkvcrv Uvbq Gqyrwntx Ofnnuwrnh',
      priority: 'Low',
      iteration: 'iteration',
      assignee: 'Jason Rodriguez',
      status: 'Done',
      timeline: '1994-02-08',
    },
    {
      id: '440000201807134089',
      title: 'Rbh Wklmth Xkeg Iuzan Isufy',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Kenneth Robinson',
      status: 'Done',
      timeline: '2017-02-04',
    },
    {
      id: '430000197502028524',
      title: 'Zcbap Qqoyxrimw Hndekkk',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Jason Garcia',
      status: 'Done',
      timeline: '2009-09-09',
    },
    {
      id: '360000199102159374',
      title: 'Sarbgroo Rpru Krzhklgihv Vfgha Bunyqz',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Michelle Lee',
      status: 'Done',
      timeline: '2019-02-22',
    },
    {
      id: '530000200702210206',
      title: 'Tksno Nvsche Rmysrkwsy Qxjvulnsd Rzo',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Ruth Anderson',
      status: 'Done',
      timeline: '1980-01-05',
    },
    {
      id: '120000201207262146',
      title: 'Mcpnwxqws Dfqrmphi Ipl',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Susan Garcia',
      status: 'Done',
      timeline: '1972-01-14',
    },
    {
      id: '360000199409270026',
      title: 'Lwomkvcng Hwwj Hhjxlz',
      priority: 'High',
      iteration: 'iteration',
      assignee: 'Kevin Johnson',
      status: 'Done',
      timeline: '1991-06-03',
    },
    {
      id: '500000201603203501',
      title: 'Mjfflwan Oebhykk Ppjpy Itnxlw Jqtm Lcsloswa',
      priority: 'Low',
      iteration: 'iteration',
      assignee: 'Jennifer Harris',
      status: 'Stuck',
      timeline: '2014-08-09',
    },
    {
      id: '130000197712017750',
      title: 'Sdudlc Hcrfkaz Kufynndl Oprvfsh Teipjsd',
      priority: 'High',
      iteration: 'iteration',
      assignee: 'Kimberly Harris',
      status: 'Stuck',
      timeline: '1990-12-12',
    },
    {
      id: '510000201304014163',
      title: 'Blhh Pdisxhqkl Ixnj Erbpeel Bjuvr Cdngo',
      priority: 'High',
      iteration: 'iteration',
      assignee: 'Angela Martinez',
      status: '',
      timeline: '2005-04-01',
    },
    {
      id: '820000199503017685',
      title: 'Bjzruarho Yqwrkksnkb Gsjr Otwbvihju',
      priority: 'Medium',
      iteration: 'iteration',
      assignee: 'Ronald Hernandez',
      status: 'Working on it',
      timeline: '2016-07-01',
    },
    {
      id: '820000198503197802',
      title: 'Zjc Jwtut Mftvcu Ctylolht Xcdi',
      priority: 'Low',
      iteration: 'iteration',
      assignee: 'Edward Wilson',
      status: 'Stuck',
      timeline: '1989-03-29',
    },
    {
      id: '820000201707240870',
      title: 'Cbksh Iswxgkytcw Pmbzpv Hphtfnxw',
      priority: 'High',
      iteration: 'iteration',
      assignee: 'Betty Lewis',
      status: 'Done',
      timeline: '1987-09-21',
    },
    {
      id: '460000197810188840',
      title: 'Vmjjt Qpqjcb Ffwmwnxdn Tften Yidwthci',
      priority: 'Low',
      iteration: 'iteration',
      assignee: 'Angela Jones',
      status: 'Done',
      timeline: '2003-03-20',
    },
    {
      id: '130000198908073513',
      title: 'Avkacxzqab Bfxtwexs Buwwvxe',
      priority: 'High',
      iteration: 'iteration',
      assignee: 'Anthony Jones',
      status: 'Stuck',
      timeline: '2003-02-22',
    },
  ];

  private cardSource: Card[] = [
    {
      name: 'Angular',
      title: 'Angular',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'DevUI',
      title: 'DevUI',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计...',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'BootStrap',
      title: 'BootStrap',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'React',
      title: 'React',
      imgSrc: 'https://codingthesmartway.com/wp-content/uploads/2019/12/logo_react.png',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'Vue',
      title: 'Vue',
      imgSrc: 'https://vuejs.org/images/logo.png',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'Webpack',
      title: 'Webpack',
      imgSrc: 'https://webpack.js.org/icon-square-small.85ba630cf0c5f29ae3e3.svg',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'DevUI',
      title: 'DevUI',
      content:
        'DevUI是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计...',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'BootStrap',
      title: 'BootStrap',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'React',
      title: 'React',
      imgSrc: 'https://codingthesmartway.com/wp-content/uploads/2019/12/logo_react.png',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'Vue',
      title: 'Vue',
      imgSrc: 'https://vuejs.org/images/logo.png',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'Webpack',
      title: 'Webpack',
      imgSrc: 'https://webpack.js.org/icon-square-small.85ba630cf0c5f29ae3e3.svg',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'DevUI',
      title: 'DevUI',
      content:
        'DevUI是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计...',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'BootStrap',
      title: 'BootStrap',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'React',
      title: 'React',
      imgSrc: 'https://codingthesmartway.com/wp-content/uploads/2019/12/logo_react.png',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'Vue',
      title: 'Vue',
      imgSrc: 'https://vuejs.org/images/logo.png',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
    {
      name: 'Webpack',
      title: 'Webpack',
      imgSrc: 'https://webpack.js.org/icon-square-small.85ba630cf0c5f29ae3e3.svg',
      content:
        'DevUI 是面向企业中后台产品的开源前端解决方案，其设计价值观基于"至简"、"沉浸"、"灵活"三种自然与人文相结合的理念，旨在为设计....',
      actions: [
        {
          icon: 'icon-star-o',
          num: '617',
        },
        {
          icon: 'icon-fork',
          num: '100',
        },
      ],
    },
  ];

  private pagerList(data: Item[] | Card[], pager: ListPager) {
    return data.slice(pager.pageSize! * (pager.pageIndex! - 1), pager.pageSize! * pager.pageIndex!);
  }
  private convertData(data: Furniture[]): FurnitureData[] {
    const final = data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        quantity: item.quantityAvl,
        category: item.furnitureCategory?.name,
        year: item.furnitureCategory?.studyLevel?.level,
        createdAt: item.createdAt,
      };
    });
    console.log(final);
    return final;
  }
  private convertDemandData(data: FurnitureRequest[]): FurnitureRequestData[] {
    const final = data.map((item) => {
      return {
        id: item.id,
        title: item.furniture?.title,
        description: item.furniture?.description,
        firstname: item.taker?.name,
        category: item.furniture?.furnitureCategory?.name,
        year: item.furniture?.furnitureCategory?.studyLevel?.level,
        username: item.taker?.username,
      };
    });
    console.log(final);
    return final;
  }
  getAllDemands(pager: ListPager): Observable<any> {
    this.store.dispatch(loadFurnitureRequests());
    this.store.select(getFurnitureRequests).subscribe((v) => {
      this.furnitureRequests = v;
      console.log('array :', v);
    });
    return observableOf({
      pageList: this.pagerList(this.convertDemandData(this.furnitureRequests), pager),
      total: this.basicData.length,
    }).pipe(delay(1000));
  }
  getAllFurnitures(pager: ListPager): Observable<any> {
    this.store.dispatch(loadFurnitures());
    this.store.select(getFurnitures).subscribe((v) => {
      this.furnitures = v;
      console.log('array :', v);
    });
    return observableOf({
      pageList: this.pagerList(this.convertData(this.furnitures), pager),
      total: this.basicData.length,
    }).pipe(delay(1000));
  }

  getMyFurnitures(pager: ListPager): Observable<any> {
    const id = this.authService.getUserId();
    this.store.dispatch(loadFurnitures());
    this.store.select(getFurnitures).subscribe((v) => {
      this.furnitures = v.filter((item) => (item !== undefined && item.author !== undefined ? item.author.id == id : 0));
    });
    console.log(this.furnitures);
    return observableOf({
      pageList: this.pagerList(this.convertData(this.furnitures), pager),
      total: this.basicData.length,
    }).pipe(delay(1000));
  }

  getOriginSource(pager: ListPager): Observable<any> {
    return observableOf({
      pageList: this.pagerList(this.basicData, pager),
      total: this.basicData.length,
    }).pipe(delay(1000));
  }

  getTreeSource(pager: ListPager): Observable<any> {
    return observableOf({
      pageList: this.pagerList(this.basicData, pager),
      total: this.basicData.length,
    }).pipe(delay(1000));
  }

  getCardSource(pager: ListPager): Observable<any> {
    return observableOf({
      pageList: this.pagerList(this.cardSource, pager),
      total: this.cardSource.length,
    }).pipe(delay(1000));
  }
}
