class TooltipObserver {
  // 观测者
  private observer: IntersectionObserver;
  // 被观测对象列表
  private observedObjectList: Element[] = [];
  constructor() {
    // 创建观测者
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // 如果元素开始进入可视区域
          if (entry.isIntersecting) {
            console.log(entry, observer);

            console.log("Element is now inside the viewport.");
          }
          // 如果元素开始离开可视区域
          else {
            console.log("Element is now outside the viewport.");
          }
        });
      },
      { root: null, rootMargin: "-100%", threshold: 0.01 }
    );
  }
  // 添加观测对象
  addObList(el: Element) {
    this.delObList();
    if (!this.observedObjectList.includes(el)) this.observedObjectList.push(el);
    this.observe();
  }
  // 删除不需要观测的对象
  delObList() {
    this.observedObjectList = this.observedObjectList.filter(
      (item: Element) => {
        // 移除不需要的观测
        if (!item.classList.contains("yq-tooltip-active")) {
          this.observer.unobserve(item);
        }
        return item.classList.contains("yq-tooltip-active");
      }
    );
  }
  // 开始进行观测
  observe() {
    this.observedObjectList.forEach((item) => this.observer.observe(item));
  }
}

export const tooltipObserver = new TooltipObserver();
