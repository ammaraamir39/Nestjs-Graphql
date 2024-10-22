/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver
} from '@nestjs/graphql'
import {AnalyticsService} from './analytics.service'

@Resolver('Analytics')
export class AnalyticsResolver {
    constructor(
        private readonly analyticsService: AnalyticsService
    ) {
    }

    @Query()
    async getCount() {
        return await this.analyticsService.getCount()
    }

    @Query()
    async getLastMonthQuotationAndOrderRevenue() {
        return await this.analyticsService.getLastMonthQuotationAndOrderRevenue()
    }

}