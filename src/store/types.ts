

export type StudentType = {
    name: string,
    id: string,

    /**
     * 随机选人权重，权重越高被选中的几率越大
     * 
     * 默认值：10
     */
    val?: number,
};

export const DefaultConfig = () => ({

    /** 功能设置 */
    fn: {

        /** 随机选人设置 */
        random: {

            /**
             * 名单
             * 
             * ```
             * [
             *   { name: "张三", id: "1", val: 8 },
             *   { name: "李四", id: "2" },
             *   ...
             * ]
             * ```
             */
            data: [] as StudentType[],

            /**
             * 是否开启随机选人公平模式（所有人权重都相等）
             * 
             * 默认值：false
             */
            fairMode: false as boolean,

            /**
             * 是否显示人名（item.name）
             * 
             * 默认值：true
             */
            showName: true as boolean,

            /**
             * 是否显示人ID（item.id）
             * 
             * 默认值：true
             */
            showId: true as boolean,

            /**
             * 随机选人结果显示时长（单位：ms）
             * 
             * 默认值：3500
             */
            displayDuration: 3500 as number,

            /**
             * 随机选人摇人显示时长（单位：ms）
             * 
             * 默认值：500
             */
            shuffleDuration: 500 as number,

        },

        /** 课程表设置 */
        schedule: {

            /**
             * 课程表
             * 
             * ```
             * [
             *   [ "周一第1节课", "周一第2节课", "周一第3节课", ... ],
             *   [ "周二第1节课", "周二第2节课", "周二第3节课", ... ],
             *   ...
             * ]
             * ```
             */
            data: [] as string[][],

            /**
             * 每节课的开始结束时间
             * 
             * ```
             * [
             *   [ "08:00", "08:45" ],
             *   [ "08:55", "09:40" ],
             *   ...
             * ]
             */
            time: [] as [string, string][],

            /**
             * 修改课程表可选课程
             * 
             * ```
             * [ "语文", "数学", ... ]
             */
            scheduleOptions: [] as string[][],

            /**
             * 是否显示课程表
             * 
             * 默认值：true
             */
            show: true as boolean,
        },

        /** 时间设置 */
        clock: {
            /**
             * 是否显示时间
             * 
             * 默认值：true
             */
            show: true as boolean,

            /**
             * 时间刷新频率（单位：ms）
             * 
             * 默认值：1000
             */
            refreshRate: 1000 as number,

            /**
             * 时间显示格式
             * 
             * 默认值："HH:mm"
             */
            format: "HH:mm" as string,

            /**
             * 是否显示日期
             * 
             * 默认值：true
             */
            showDate: true as boolean,

            /**
             * 日期显示格式
             * 
             * 默认值："M月D日 dddd"
             */
            dateFormat: "M月D日 dddd" as string,
        },

        /** 倒计时 */
        countdown: {
            /**
             * 是否显示倒计时
             * 
             * 默认值：false
             */
            show: false as boolean,

            /**
             * 倒计时项目
             * 
             * ```
             * [
             *   { name: "项目名称", time: 项目发生似的Unix时间戳 },
             *   ...
             * ]
             * ```
             */
            data: [] as {
                name: string,
                time: number,
            }[],

            /**
             * 倒计时切换间隔
             * 
             * 默认值：5000
             */
            interval: 5000 as number,
        },

        /** 劳动表 */
        labor: {
            /**
             * 劳动表
             * 
             * ```
             * [
             *   {
             *     name: "项目名称",
             *     data: [ "周一劳动1", "周一劳动2", "周一劳动3", ... ]
             *   },
             *   ...
             * ]
             * ```
             */
            data: [] as {
                name: string,
                people: string[],
                important?: boolean,
            }[],
        }
    },

    /** 样式设置 */
    style: {
        /**
         * 主题
         * 
         * 默认值："dark"
         */
        theme: "dark" as "dark" | "light",

        /**
         * 文字颜色
         * 
         * 默认值："dark"主题为"#fff"，"light"主题为"#000"
         */
        color: {
            dark: { 
                font: "#fff" as string,
                back: "#000" as string,
            },
            light: { 
                font: "#000" as string,
                back: "#fff" as string,
            },
        },

        /**
         * 背景图片
         * 
         * 默认值："/config/background-default.png"
         */
        background: "/config/background-default.png" as string,

        /**
         * 页面缩放（zoom）
         * 
         * 默认值：100%
         */
        zoom: "100%" as string,

        /**
         * 背景启用视频
         * 
         * 默认值：false
         */
        backgroundVideo: false as boolean,

        /**
         * 背景视频地址
         * 
         * 默认值："/config/background-default.webm"
         */
        backgroundVideoSrc: "/config/background-default.webm" as string,

        /**
         * 页脚距离页面底部高度
         * 
         * 默认值："10px"
         */
        footerBottom: "10px" as string,

        /**
         * 背景虚化大小
         * 
         * 默认值："20px"
         */
        blur: "20px" as string,
    }
});