import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import moment from 'moment'
import {AtList, AtListItem, AtTabs, AtTabsPane, AtAccordion, AtButton} from "taro-ui"
import './index.scss';
import {currentUser} from '../../utils/user'

@connect(({study}) => ({
  ...study,
}))
export default class Study extends Component {
  config = {
    navigationBarTitleText: 'study',
  };

  constructor(props) {
    super(...arguments)
    this.state = {
      tabKey: 0,
      openAccordion: false,
      currentAccordion: '',
      searchItems: {
        patientName: '',
        patientNumber: '',
        createdBy: '',
        createdTime: [],
      },
      paginationProps: {
        current: 1,
        pageSize: 10,
        total: 0,
        pageSizeOptions: ['2', '10', '20', '30', '40'],
        showQuickJumper: true,
        showSizeChanger: true,
      },
      sortedInfo: {
        columnKey: 'lastModifiedDate',
        column: 'descend',
      },
    }
  }

  componentDidMount = () => {
    this.getStudies();
    this.getStudyByStatus();
  };
  getStudyByStatus = () => {
    const cUser = currentUser()
    this.props.dispatch({
      type: 'study/getStudyByStatus',
      payload: {status: 'PENDING', userName: cUser.name, role: cUser.role},
      callback: (response) => {
        // Taro.navigateTo({url: '/pages/study/index'})
      }
    });
  }

  getStudies = () => {
    const cUser = currentUser()
    const {dispatch} = this.props;
    const {paginationProps, searchItems, sortedInfo, tabKey} = this.state;
    const {order = 'descend', columnKey = 'lastModifiedDate'} = sortedInfo;
    const userGroupList = cUser.userGroups || [];
    const {current, pageSize} = paginationProps;
    const {patientName, patientNumber, createdBy, createdTime, groups} = searchItems;
    const params = {
      pageNumber: current,
      pageSize,
      status: 'COMPLETED',
      sortField: columnKey,
      sortOrder: order === 'descend' ? 'DESC' : 'ASC',
    };
    if (tabKey === 0) {
      params.userName = cUser.name;
      params.role = cUser.role;
    } else {
      // 共享组名称
      const arr = [];
      userGroupList.reduce((previousValue, currentValue, index) => {
        if (groups.includes(currentValue.id)) {
          arr.push(currentValue.name);
        }
        return arr;
      }, arr);
      params.groups = arr.join(',');
    }
    if (patientName) params.patientName = patientName;
    if (patientNumber) params.patientNumber = patientNumber;
    if (createdBy) params.createdBy = createdBy;
    // 处理查询时间 转为startTime / endTime 时间戳
    if (createdTime && createdTime.length) {
      params.startTime = moment(createdTime[0]).format('YYYY-MM-DD HH:mm:ss');
      params.endTime = moment(createdTime[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    dispatch({
      type: tabKey === 0 ? 'study/getStudies' : 'study/getStudiesShared',
      payload: params,
      callback: (response) => {
        const {total} = response;
        //  设置分页
        Object.assign(paginationProps, {current, pageSize, total});
        this.setState({paginationProps});
      },
    });
  };

  handleListItemClick = () => {

  }

  handleTabChange = (tabKey) => {
    const cUser = currentUser()
    let {searchItems} = this.state;
    const userGroupList = cUser.userGroups || [];
    if (tabKey === 0) {
      delete searchItems.groups;
    } else {
      searchItems = {
        patientName: '',
        patientNumber: '',
        createdBy: '',
        groups: userGroupList.map(v => v.id),
        createdTime: [],
      };
    }
    this.setState({
      tabKey,
      searchItems,
    }, () => {
      this.getStudies();
    });
  };

  handleAccordionClick = (openAccordion, currentAccordion) => {
    this.setState({openAccordion, currentAccordion})
  }

  render() {
    const {tabKey = 0, openAccordion, currentAccordion} = this.state
    const {studyWithStatus, studyList = {studies: []}} = this.props
    const tabList = [{title: '病例列表'}, {title: '组共享病例'}]
    console.log(`tabKey:`, tabKey)
    return (
      <View className="study-page">
        <View className='at-article__h1 center-title'>
          病例列表
        </View>
        <AtTabs current={tabKey} tabList={tabList} onClick={this.handleTabChange.bind(this)}>
          <AtTabsPane current={tabKey} index={0}/>
          <AtTabsPane current={tabKey} index={1}/>
        </AtTabs>
        {studyList.studies && studyList.studies.map((item, key) => {
          return (
            <AtAccordion
              hasBorder={false}
              open={openAccordion && currentAccordion === item.id}
              onClick={(openAccordion) => this.handleAccordionClick(openAccordion, item.id)}
              title={item.patient.name}
            >
              <View className='detail-view'>
                <p>病人姓名：{item.patient.name}
                  <AtButton size='small' circle className='view-btn'>查阅</AtButton>
                </p>
                <p>病人编号：{item.patient.patientNumber}</p>
                <p>扫描部位：{item.bodyPart}</p>
                <p>年龄：{item.patient.age}</p>
                <p>创建人：{item.createdBy}</p>
                <p>更新时间：{item.lastModifiedDate}</p>
              </View>
            </AtAccordion>
          )
        })}
      </View>
    )
  }
}
