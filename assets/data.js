/* PSY3130 Psychology of Leadership，每周二四必读关键词
   数据依据：course outline PSY3130_leadership_2026.pdf，§10 Indicative teaching plan
   source: required=Class 指定必读 / inferred=该场无指定文献，按本周主题推导
   extension: 句中用到的 Additional resources（选读），单独标注，不混入必读 */

window.PSY = {
  meta: {
    course: 'PSY3130 Psychology of Leadership',
    instructor: 'Prof. Tsirogianni Stavroula',
    term: 'AY2026-27 Term 1',
    source: 'course outline PSY3130_leadership_2026.pdf，§10 Indicative teaching plan',
    stance: '这门课把「驱散关于领导的神话」写进目标。下面按周二、周四的必读各取两个关键词：一个用来拆掉传统解释，一个用来把关系、差异与被漏掉的人放回去。每句话都落到具体场域，说明它对理论和实践分别改了什么。',
    stats: { weeks: 15, sessions: 30, keywords: 60, modules: 6 }
  },

  /* 认识变化：学期开始时的默认说法 → 课程之后的说法 */
  shiftRows: [
    { n: '01', before: '领导是一种能跨文化搬用的自然事实', after: '领导是一套有来历、有边界的说法', where: 'W1–W2' },
    { n: '02', before: '组织成败主要取决于坐在顶端的那个人', after: '结构、位置与关系在解释里占更大分量', where: 'W2–W3' },
    { n: '03', before: '特质、情境与魅力模型给出可通用的处方', after: '处方要标出它来自哪种制度与样本', where: 'W3–W5' },
    { n: '04', before: '追随者服从，差异是可控制的变量', after: '共同身份与差异参与构成领导', where: 'W8–W9' },
    { n: '05', before: '包容等于把更多人放进既有结构', after: '改的是结构里谁被看见、谁承担代价', where: 'W6–W11' },
    { n: '06', before: '换一个更好的领导者就能解决问题', after: '把目的、对象、地点问清楚，再决定要不要设这个位置', where: 'W14' }
  ],

  modules: [
    {
      id: 'm1', num: '01', span: 'W1 – W2',
      title: '领导这个词需要被追问',
      en: 'The category itself',
      thesis: '把概念的历史和边界摊开。课程没有急着给领导下定义，问的是这个范畴由谁提供、替谁遮住了什么。',
      weeks: [
        {
          id: 'w1', label: 'W1', topic: 'Introduction – Histories and Definitions of Leadership',
          from: '领导力被当作一种自然存在', to: '它是一套有来历的说法',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Introduction（该场无指定文献）', source: 'inferred',
              places: ['概念史', '课堂'],
              contra: { term: '历史的偶然', line: '把「领导力」当成跨文化通用的人类常量，会抹掉它从欧美现代组织史里长出来的那截来历。',
                theory: '概念不做历史化，比较研究就会把同一套范畴硬套到别的制度上。', practice: '读案例前问清这套词汇由谁提供，谁的经验被它挡在门外。' },
              pro: { term: '去神话作为起点', line: '大纲把「驱散关于领导的神话」写进课程目标，学生第一件事是练习不拿领导者当解释的起点。',
                theory: '研究问题从「谁在领导」换成「什么让领导显得必要」。', practice: '组织复盘时按住人事归因，去看流程与资源。' }
            },
            {
              day: '周四 / Class 2', reading: 'The Power of Leaders，Carroll, Ford & Taylor (2023)', source: 'required',
              places: ['教材', '等级型组织'],
              contra: { term: '领导者中心', line: '把组织成败记在一个人名下，结构、追随者与资源就从解释里消失。',
                theory: '归因偏差被写进模型，方法上等于只采样主席台。', practice: '换帅解决不了的难题，往往出在岗位设计与信息流。' },
              pro: { term: '关系里的权力', line: '权力在关系与授权中流动，谁被听见比谁坐在高位更能决定结果。',
                theory: '权力从个人属性改写成关系变量。', practice: '改发言顺序、开放议程，比换负责人更能改变产出。' }
            }
          ]
        },
        {
          id: 'w2', label: 'W2', topic: 'Who is a leader? Who is a manager? Power, emotion and authority',
          from: '领导、管理、头衔算同一件事', to: '三者的边界由权力划定',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch1 Leadership, Management and Headship，Carroll et al. (2023)', source: 'required',
              places: ['组织日常', '服务与监管岗位'],
              contra: { term: '三者混用', line: '把领导、管理与 headship 当同义词，情绪和服从就被改写成技术故障。',
                theory: '概念合并会隐去权威的来源。', practice: '员工沉默常被当成沟通问题，其实是位置差别在起作用。' },
              pro: { term: '情绪也是权力', line: '控制谁该表现哪种情绪，权威已经在这件事里运作，把它纳入分析才看得见软性支配。',
                theory: '情感劳动进入领导研究，补上量表漏掉的维度。', practice: '评估管理者时把团队情绪成本记进账。' }
            },
            {
              day: '周四 / Class 2', reading: 'Billig (2015) Kurt Lewin 的领导力研究及其遗产；Lukes 第三维权力视频', source: 'required',
              places: ['1940 年代美国', '理论跨文化搬运'],
              contra: { term: '理论被洗白', line: '勒温的民主式领导实验常被引用成管理技术，战时背景与犹太移民处境从引文里被拿掉。',
                theory: '去语境的经典会伪装成普世规律。', practice: '把参与式方案搬进别的制度前，核对它原本针对什么矛盾。' },
              pro: { term: '把理论放回语境', line: '还原实验发生时的社会紧张，「好理论最实用」这句才落得到地上。',
                theory: '理论有效性被限定在产生它的条件里。', practice: '培训材料附来源与年代，方便使用者判断适用边界。' }
            }
          ]
        }
      ]
    },

    {
      id: 'm2', num: '02', span: 'W3 – W5',
      title: '三种主流解释的裂缝',
      en: 'Where the mainstream models crack',
      thesis: '伟人、权变、变革型领导依次登场，也依次被追问：样本从哪来，情境被压成了什么，统一愿景压掉了谁。',
      weeks: [
        {
          id: 'w3', label: 'W3', topic: 'The Great Man theories',
          from: '领导者靠天生特质胜出', to: '名录里缺席了谁更说明问题',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Chapter 2，Prakasam (2023) A Diverse, Inclusive and Critical Approach', source: 'required',
              places: ['领导力教材', '招聘场景'],
              contra: { term: '伟人史观', line: '用传记与特质清单解释领导，出身、种族和制度门槛就从故事里删掉了。',
                theory: '样本只取到已经上位的人，结论难以证伪。', practice: '按「像不像现任领导」筛人，会复制同一批人。' },
              pro: { term: '谁被算作领导者', line: '这本教材把多样、包容、批判写进书名，把名录里缺席的人列出来。',
                theory: '抽样框进入研究对象。', practice: '课程案例表按地区与身份列一遍，缺口当场可见。' }
            },
            {
              day: '周四 / Class 2', reading: 'Case Study / Group Reflections；Anderson et al. (2020, PNAS)', source: 'required',
              extension: 'Brass (1984) 组织网络中的位置（Additional resources）',
              places: ['职场晋升', '组织网络'],
              contra: { term: '不讨喜才上位', line: 'PNAS 的实证拆穿「自私好斗者更容易夺权」，流行心理学里的马基雅维利神话被按回去。',
                theory: '常识型假设要交给数据，不能靠轶事流传。', practice: '别把攻击性当潜力指标写进评估表。' },
              pro: { term: '位置胜过性格', line: '影响力常来自网络中的位置与时机，性格清单解释不了这部分。',
                theory: '从特质模型转向结构分析。', practice: '轮岗与跨组连接，比人格培训更能改变谁有影响力。' }
            }
          ]
        },
        {
          id: 'w4', label: 'W4', topic: 'The importance of contingency: situational theories',
          from: '找到匹配情境的风格即可', to: '情境反过来定义了什么算领导',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch3 Leading through Contingencies，Carroll et al. (2023)', source: 'required',
              places: ['跨国组织', '不同制度环境'],
              contra: { term: '情境被压成变量', line: '权变模型把文化、历史与政治收进几个可调参数，语境成了背景噪音。',
                theory: '可测的少数变量替代了不可测的制度条件。', practice: '总部把同一套情境问卷套到各分部，本地冲突会被判成执行不力。' },
              pro: { term: '情境具有构成性', line: '领导要适应的对象，同时规定了什么行为会被当地认作领导。',
                theory: '自变量与因变量的界限被重新划定。', practice: '进入新场域，弄清当地承认谁的权威，再谈风格。' }
            },
            {
              day: '周四 / Class 2', reading: 'National Day（停课，无指定必读；沿用本周主线）', source: 'inferred',
              places: ['停课周', '校历与组织节奏'],
              contra: { term: '普适模型的空档', line: '连最合适的风格都要挑语境，那张跨制度都成立的表更该被怀疑。',
                theory: '模型宣称的通用性缺乏检验场。', practice: '制度性停摆反而暴露组织对单一负责人的依赖。' },
              pro: { term: '公共时间也在塑造领导', line: '假期与制度节奏参与决定谁在场、谁能发起，这部分很少进模型。',
                theory: '时间结构被纳入语境清单。', practice: '排关键决策时避开只有某类人能在场的时段。' }
            }
          ]
        },
        {
          id: 'w5', label: 'W5', topic: 'The importance of that special something: transformational theories',
          from: '魅力与愿景天然向善', to: '统一愿景压掉异议时，代价在绩效之前出现',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'National Day（停课，无指定必读；沿用本周主线）', source: 'inferred',
              places: ['停课周', '日常协作'],
              contra: { term: '魅力的空档', line: '没有领袖在场的日子，正好检验组织有没有把全部能动性寄存在一个人身上。',
                theory: '变革型领导研究常缺「领导者缺席」这组对照。', practice: '让流程在负责人休假时照常跑，是最便宜的压力测试。' },
              pro: { term: '分散的能动性', line: '把「谁在推动改变」从主席台挪回日常工作，改变才不依赖一次动员。',
                theory: '能动性从个体属性改成分布式安排。', practice: '把改进权下放到班组，减少等指令的停顿。' }
            },
            {
              day: '周四 / Class 2', reading: 'Ch4 Transformational Leadership: Secularized Theology?，Carroll et al. (2023)', source: 'required',
              extension: 'Pan (2025) 权力距离与不道德亲组织行为；Tourish & Pinnington (2002) 企业膜拜（Additional resources）',
              places: ['高权力距离组织', '企业文化建设', '美国 Enron'],
              contra: { term: '世俗化神学', line: '变革型领导把魅力、使命与皈依写成管理工具，Enron 与 Jonestown 是它最坏的注脚。',
                theory: '愿景一致在量表里测不出被压掉的异见。', practice: '听到「为组织好」时问一句谁承担的代价被省略了。' },
              pro: { term: '给异见留位置', line: '统一文化一旦不容异议，组织健康会比绩效更早垮。',
                theory: '异见被列为领导效果的必要指标。', practice: '设固定的反驳环节与匿名通道，别只做满意度调查。' }
            }
          ]
        }
      ]
    },

    {
      id: 'm3', num: '03', span: 'W6 – W7',
      title: '从个人转向关系',
      en: 'From person to relation',
      thesis: '适应性领导把问题类型重新分类，印度性工作者项目把谁算领导者重新提问，后半段干脆把领导从个人属性改成互动过程。',
      weeks: [
        {
          id: 'w6', label: 'W6', topic: 'Adaptive & Relational Leadership',
          from: '冲突是待解的技术问题', to: '分清要改技术还是改关系与价值',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Heifetz 视频（BB）；Acumen《Getting on the Balcony》《Thinking Politically》讲义', source: 'required',
              places: ['组织变革', '变革推进'],
              contra: { term: '技术性修复', line: '把冲突当成待解的技术故障，需要改变价值与关系的适应性工作就被错诊。',
                theory: '问题类型判断错了，后续干预全部偏靶。', practice: '写清这是「缺方案」还是「有人要失去既有位置」。' },
              pro: { term: '退到阳台', line: '看清系统里的关系与利益之后再行动，「政治地思考」承认盟友与代价都要算。',
                theory: '观察者位置被写进方法论。', practice: '动手前画一张谁会受损的表，比动员口号管用。' }
            },
            {
              day: '周四 / Class 2', reading: 'Cornish, Shukla & Banerji (2010) 印度性工作者 HIV 预防项目，AIDS Care', source: 'required',
              places: ['印度', '性工作者组织', '全球南方'],
              contra: { term: '谁算领导者', line: '劝说、抗议、换人情这些策略进不了主流领导力量表，于是她们的行动被记成「配合」。',
                theory: '测量工具决定了哪些实践能被看见。', practice: '评估社区项目时别只数职务头衔，记下实际动员方式。' },
              pro: { term: '边缘者的策略库', line: '把她们的做法写进必读，领导力理论才接得住全球南方的组织经验。',
                theory: '理论来源从欧美样本向外扩。', practice: '培训案例换成这类材料，学员对「领导」的想象会松一点。' }
            }
          ]
        },
        {
          id: 'w7a', label: 'W7a', topic: 'Leadership, Learning and Development',
          from: '发展项目把人培养成领袖', to: '发展项目也在生产一种可被展示的领袖',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Leadership Learning and Development，Carroll et al. (2023)', source: 'required',
              extension: 'Ferry & Guthey (2020) 美国高校的忏悔式培养文化（Additional resources）',
              places: ['领导力培训项目', '培训现场'],
              contra: { term: '发展即规训', line: '培训常把人塑成可展示的样子，忏悔式自述比实际能力更被考察。',
                theory: '项目效果被自我叙述取代，测量效度存疑。', practice: '少收反思作文，多看参与者回去后改了哪条流程。' },
              pro: { term: '从学习者一侧看', line: '按参与者怎么体验项目来研究，才看得见美学与身体怎样参与塑造「领导的样子」。',
                theory: '研究对象从设计者转到参与者。', practice: '课程评估加一轮匿名访谈，问哪里让人不舒服。' }
            },
            {
              day: '周四 / Class 2', reading: 'Case Study / Group Reflections（该场无指定文献）', source: 'inferred',
              places: ['课堂讨论', '个人反思作业'],
              contra: { term: '案例的普遍性', line: '一个课堂案例被讲成通则，特定行业与阶层的经验就悄悄升格成标准。',
                theory: '单案例外推缺少边界说明。', practice: '每个案例后面附一张「换成别的场景会怎样」的对照。' },
              pro: { term: '反思作为方法', line: '让学生写自己的处境，等于承认知识来自位置，不来自真空。',
                theory: '位置性被写进认识论。', practice: '小组讨论各自报一下立场，再谈结论。' }
            }
          ]
        },
        {
          id: 'w7b', label: 'W7b', topic: 'Relational Leadership（大纲另列，未标周次）',
          from: '领导是某人持有的属性', to: '领导在互动里发生',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Chapter 5，Prakasam (2023)', source: 'required',
              places: ['团队互动', '项目制团队'],
              contra: { term: '实体化领导者', line: '把领导当成一个人揣着的属性，协调、互相影响与临时接手就全被漏掉。',
                theory: '实体化假设挡住了过程性数据。', practice: '记录谁在什么时候接住了任务，比评「谁有领导力」更实。' },
              pro: { term: '关系中的生成', line: '领导在来回互动里出现，同一场合里可以由不同人轮流承担。',
                theory: '分析单位从个人换成互动序列。', practice: '轮值主持与交接记录，让承担可见也可交接。' }
            },
            {
              day: '周四 / Class 2', reading: 'Group exercise（该场无指定文献）', source: 'inferred',
              places: ['课堂练习', '小组现场'],
              contra: { term: '练习去语境', line: '把关系领导做成脱离身份与权力的角色扮演，练出来的多半是流畅话术。',
                theory: '模拟缺了权力差异，外部效度低。', practice: '给练习加上资源不对等的条件，观察会不会变。' },
              pro: { term: '容纳差异', line: '小组里谁第一个开口、谁的话被复述，是包容性领导的现场数据。',
                theory: '过程指标替代印象评分。', practice: '计一次发言与引用分布，比课后打分诚实。' }
            }
          ]
        }
      ]
    },

    {
      id: 'm4', num: '04', span: 'W8 – W9',
      title: '差异、身份与谁被算进来',
      en: 'Difference, identity, and the roster',
      thesis: '差异从控制项变成构成条件，追随者从被动方变成共同身份的持有人。教材把全球南方与监狱里的实践放进必读，理论的样本边界被推开。',
      weeks: [
        {
          id: 'w8', label: 'W8', topic: 'Difference & Leadership',
          from: '差异是待控制的变量', to: '差异参与构成领导',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch7 Difference and Leadership，Carroll et al. (2023)', source: 'required',
              extension: 'Liu & Baker (2016) 白骑士与英雄化的白人性（Additional resources）',
              places: ['量化研究设计', '英雄叙事'],
              contra: { term: '差异当变量', line: '把性别、族群做成回归里的控制项，会掩盖组织怎样主动生产这些差别。',
                theory: '控制变量的处理把结构性问题降级为噪音。', practice: '报结果时别只写「控制后不显著」，补一段分类怎么来的。' },
              pro: { term: '差异是构成性的', line: '领导从来带着种族化与性别化的记号，白骑士式的英雄化也算一种。',
                theory: '中性领导者形象被拆成有位置的表述。', practice: '宣传素材里改的是谁被拍进去。' }
            },
            {
              day: '周四 / Class 2', reading: 'Nguyen, Taylor, Gibson & Gordon (2023) 全球南方女性领导；Zeina Daccache 黎巴嫩监狱戏剧治疗', source: 'required',
              extension: 'Iyer (2022) 优势群体对 DEI 的威胁感；Bell & Hartmann (2007) Happy Talk（Additional resources）',
              places: ['越南', '黎巴嫩监狱', '全球南方', '企业 DEI 沟通'],
              contra: { term: '包容的 Happy Talk', line: '把多样性讲成和谐故事，优势群体对 DEI 的威胁感就被盖住。',
                theory: '话语分析能测出官方叙事回避了什么。', practice: '年度多样性报告留出「反对意见」一栏，别只放合影。' },
              pro: { term: '从全球南方取证据', line: '越南女性领导与黎巴嫩监狱里的戏剧治疗，逼理论离开欧美样本才站得住。',
                theory: '理论适用边界被现实案例往外推。', practice: '案例库按地区配额更新，缺的地区标成待补。' }
            }
          ]
        },
        {
          id: 'w9', label: 'W9', topic: 'The Importance of Followers: Crafting and Mobilising Identities',
          from: '追随等于服从', to: '共同身份排在影响力之前，也能把人带到最坏的地方',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch3 社会认同与自我归类，Haslam, Reicher, Stephen & Platow (2020)', source: 'required',
              places: ['组织动员', '团队与社群'],
              contra: { term: '追随者被动', line: '把追随写成服从，就认不出「我们是谁」才是动员的发动机。',
                theory: '追随者中心模型补上领导者中心模型的盲区。', practice: '做共同身份的工作，指令放在后面。' },
              pro: { term: '身份共创', line: '领导与追随共享一个「我们」，影响力来自这层共同身份而非个人魅力。',
                theory: '影响力被改写为群体内过程。', practice: '让成员参与定名与定边界，比反复宣讲愿景有效。' }
            },
            {
              day: '周四 / Class 2', reading: 'Durrheim et al. (2024) Jonestown 集体杀戮的话语动员；TikTok 愿景案例', source: 'required',
              places: ['美国 Jonestown', '平台组织'],
              contra: { term: '魅力的终点', line: '话语动员可以把共同身份推到集体自杀，认同不担保向善。',
                theory: '身份路径需要配上后果检验。', practice: '高凝聚团队也要留外部反馈与退出通道。' },
              pro: { term: '谁在画「我们」的边界', line: '平台愿景与组织叙事都在划界线，批判落在边界由谁定、谁被划出去。',
                theory: '边界由谁划，成了领导实践里绕不开的动作。', practice: '审愿景文件时加一问：这份「我们」把谁写成了外人。' }
            }
          ]
        }
      ]
    },

    {
      id: 'm5', num: '05', span: 'W10 – W12',
      title: '没有领导者的组织，与身体所在的场所',
      en: 'No leaders, and the places bodies occupy',
      thesis: '无领导者、空间争夺、具身伦理接连出现。分析单位从职位换成车队、群聊、工位与值班表，被排除在模型外的人重新进入视野。',
      weeks: [
        {
          id: 'w10', label: 'W10', topic: 'Leading without Leaders',
          from: '组织一乱就得有个头', to: '协作失败常被误读成领导缺位',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch11 Leadership without Leaders，Carroll et al. (2023)', source: 'required',
              extension: 'Raelin (2016) 把领导改写为协作能动性（Additional resources）',
              places: ['危机中的组织', '自组织团队'],
              contra: { term: '必须有头', line: '一遇混乱就呼唤强人，把协作失败记成缺了负责人。',
                theory: '功能主义假设绕过了对协调机制的检查。', practice: '查清信息在哪里断的，再决定要不要设岗。' },
              pro: { term: '协作能动性', line: '把领导改写成 collective agency，实践上可以把「指定负责人」这一步拆掉。',
                theory: '领导作为单独变量被取消。', practice: '试点无固定召集人的项目组，记录决策怎么发生。' }
            },
            {
              day: '周四 / Class 2', reading: 'Fu (2019) 中国青年网络参与的预演式政治', source: 'required',
              extension: 'Xin & Liu (2024) 躺平；Cornish et al. (2016) 预演式政治（Additional resources）',
              places: ['中国', '青年网络参与', '线上社群'],
              contra: { term: '被代言的青年', line: '「躺平」与网络参与常由外部替他们说出意义，当事人自己的解释排在后面。',
                theory: '研究者位置影响结论，需交代谁在叙述。', practice: '引用这类现象时以当事人自述为准。' },
              pro: { term: '预演式政治', line: '手段里已经带着想要的秩序，参与过程也算目的。',
                theory: '目的与手段的顺序被倒过来处理。', practice: '别急着给松散行动找领袖，看它们维持了怎样的关系。' }
            }
          ]
        },
        {
          id: 'w11', label: 'W11', topic: 'Creating & Contesting Space',
          from: '空间被当成背景', to: '空间分配可见性与隐私，也决定谁能开口',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch13 Creating and Contesting Space through Leadership，Carroll et al. (2023)', source: 'required',
              extension: 'Taylor & Bain (1999) 呼叫中心「头脑里的装配线」（Additional resources）',
              places: ['办公与平台空间', '英国呼叫中心'],
              contra: { term: '空间中性', line: '把办公室、平台与街道当背景，看不见布局怎样分配可见性与隐私。',
                theory: '物质条件被排除在领导模型之外。', practice: '改开放工位前问一句谁会失去不被看见的权利。' },
              pro: { term: '争夺空间', line: '呼叫中心那套「头脑里的装配线」说明物理安排比制度更早决定了发声机会。',
                theory: '空间与权力进入同一层分析。', practice: '把工位、群权限、会议地点列进组织诊断清单。' }
            },
            {
              day: '周四 / Class 2', reading: 'Chen (2018) 滴滴与出租车司机的劳动与行动，New Media & Society', source: 'required',
              places: ['中国', '网约车平台', '司机车队'],
              contra: { term: '算法中立', line: '平台把调度写成技术优化，劳动与议价关系就藏进代码里。',
                theory: '技术表述掩盖了分配决策。', practice: '讨论派单规则时把司机代表的意见放进同一张桌。' },
              pro: { term: '司机自组织', line: '被扔下巴士的人用排班与群聊 reclaim 空间，领导发生在职级表之外。',
                theory: '行动单位从职位改成日常协同网络。', practice: '识别真实协调节点，别只对接平台指定的人。' }
            }
          ]
        },
        {
          id: 'w12', label: 'W12', topic: 'Embodied Leadership & Ethics',
          from: '伦理是一份合规清单', to: '伦理长在身体、疲惫与照护里',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Ch15 Embodied Leadership, Ethics and its Affects，Carroll et al. (2023)', source: 'required',
              extension: 'Pérezts, Faÿ & Picard (2014) 反洗钱分析师民族志（Additional resources）',
              places: ['合规与审计场景', '金融合规一线'],
              contra: { term: '伦理作为条款', line: '把伦理写成合规条款，身体、疲惫与情绪就被排除在判断之外。',
                theory: '规则取向的模型测不出实际判断怎么发生。', practice: '除了签字流程，记下值班时长与承受的压力。' },
              pro: { term: '具身与关怀', line: '反洗钱分析师的民族志显示伦理长在身体习惯与团队气质里。',
                theory: '伦理从规范条目转向实践与身体。', practice: '培训加入真实情境复盘，少背条文多讲当时怎么判断。' }
            },
            {
              day: '周四 / Class 2', reading: 'Case study / Group Exercise（该场无指定文献）', source: 'inferred',
              extension: 'Branicki (2020) 女性主义危机管理（Additional resources）',
              places: ['公共卫生危机', '危机中的组织'],
              contra: { term: '危机里的英雄叙事', line: '疫情常被讲成少数决断者的故事，维持日常的照护劳动被剪掉。',
                theory: '叙事取样偏向决策层。', practice: '复盘时把后勤与照护岗位列进决策链。' },
              pro: { term: '关怀伦理', line: '女性主义危机管理把「谁在维持日常」放回中心。',
                theory: '照护被列为领导实践而非配套支持。', practice: '把照护环节保住，再谈对外沟通。' }
            }
          ]
        }
      ]
    },

    {
      id: 'm6', num: '06', span: 'W13 – W14',
      title: '数据、监控，以及重新发问',
      en: 'Datafication, and asking again',
      thesis: '指标背后有人承担代价。期末的 Salon 没有给标准答案，把目的、对象、地点一起抛回给学生，认识变化落在来回走动里。',
      weeks: [
        {
          id: 'w13', label: 'W13', topic: 'Datafication & Surveillance',
          from: '数据是客观事实', to: '每个指标背后都有承担代价的人',
          sessions: [
            {
              day: '周二 / Class 1', reading: 'Chapter 10，Prakasam (2023)', source: 'required',
              extension: 'Ping (2019) 外卖平台算法与劳动（Additional resources）',
              places: ['平台劳动', '中国外卖平台'],
              contra: { term: '数据即客观', line: '把评分、轨迹与派单当成事实，平台责任就消失在「系统显示」后面。',
                theory: '指标被当作自变量，产生它的决策被隐去。', practice: '看报表时顺手问一句这个字段由谁定义、能否申诉。' },
              pro: { term: '让劳动可见', line: '写外卖骑手的研究把被算法折叠的人重新放回可讨论的位置。',
                theory: '被计量者重新成为叙述主体。', practice: '报告里给每个指标配一段从业者口述。' }
            },
            {
              day: '周四 / Class 2', reading: 'Case Study / Group Reflections（该场无指定文献）', source: 'inferred',
              extension: 'Stanford HAI (2024) AI Index 政策与治理；Trinkley et al. (2024) 实施科学里的 cautions（Additional resources）',
              places: ['AI 治理文本', '政策与实施场景'],
              contra: { term: 'AI 治理的技术腔', line: '把治理写成模型参数与合规项，谁承担代价的问题就被往后推。',
                theory: '技术框架延后了分配问题。', practice: '每次上线评估加一栏「受影响人群与申诉路径」。' },
              pro: { term: '把代价写进问题', line: '政策章节与实施科学里的 cautions 提醒把「为谁、在哪里」问清楚，再谈效果。',
                theory: '评价准则从性能扩展到后果分布。', practice: '立项模板里加「谁可能因此被少看见」一问。' }
            }
          ]
        },
        {
          id: 'w14', label: 'W14', topic: 'The Leadership Salon（期末展览，大纲未分 Class 1 / Class 2）',
          from: '换一个更好的人来领导', to: '把目的、对象与地点一起问出来',
          sessions: [
            {
              day: '周二 / 布展准备', reading: 'The Leadership Salon 评估 brief（该场无指定文献）', source: 'inferred',
              places: ['期末展品', '课程评估'],
              contra: { term: '换人不等于再想象', line: '把「我们需要什么样的领导」答成「换个更好的人」，神话原样留着。',
                theory: '问题若仍以个人为主语，批判没有进入答案。', practice: '展品说明里别只出现一张人物肖像。' },
              pro: { term: '为谁、为何、在哪里', line: '期末题目把目的、对象、地点一起抛出来，包容性从设问就开始了。',
                theory: '评价对象从领导者转向关系与场域。', practice: '站点留言区按这三个问题收集同学答案。' }
            },
            {
              day: '周四 / Gallery Walk', reading: 'The Leadership Salon 画廊漫步（该场无指定文献）', source: 'inferred',
              places: ['小组作品', '画廊漫步现场'],
              contra: { term: '展品的作者署名', line: '一件作品被归到某位主创，制作过程里的协作与照护又退到幕后。',
                theory: '作者制度复制了课程一直在拆的个体归因。', practice: '展签列出每人做了什么，不写单一负责人。' },
              pro: { term: '走动中的认识', line: '同学在各站之间走动、短谈、改口，认识变化发生在来回里，不在结论页。',
                theory: '学习被记作过程而非最终文本。', practice: '留一面墙记下「我原来以为 / 现在改了」，学期末回看。' }
            }
          ]
        }
      ]
    }
  ]
};
