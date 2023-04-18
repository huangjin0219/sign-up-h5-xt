/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-09-15 09:56:37
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-10-26 16:49:58
 */
export interface Activity {
  activityId: number
  activityImageUrl: string
  activityName: string
  detailImageUrl?: string
  endDateTime: number
  explain?: string
  joinPeopleNumber?: number
  peopleBaseNumber?: number
  gatherGroup?: number
  highestProductSalePrice?: number
  lowestTogetherPrice?: number
  shardCardImageUrl?: string
  shardPosterImageUrl?: string
  showEndTime?: number
  staffShardDescribe?: string
  showPeople?: number
  showStartTime?: number
  startDateTime: number
  userGroupOperationStatus?: number
  userShardDescribe?: string
}

export interface ParticipateUserDetail {
  groupId: number
  groupOrderPayStatusEnum?: number
  joinGroupTime?: number
  joinGroupUserHeadImage: string
  joinGroupUserId?: number
  joinGroupUserNickName: string
  joinGroupUserStatusEnum: number
  mobile?: string
}
