/**
 * 打开confirmModal
 * @param params
 * @returns {Promise<any>}
 */
export function openConfirmModal(_this, params) {
  return new Promise((resolve, reject) => {
    let iconColor = params.type === 'safety' ? '#5BC2BD' : '#ea5b6d';
    let iconClass = 'gm-tanhao_01';
    params.size = params.size || 'small'; // 默认small
    params.customClass = params.size ? params.customClass + ` ${params.size}` : params.customClass;

    if (params.type == 'success') {
      iconColor = '#5BC2BD';
      iconClass = 'gm-gouxuan';
    }

    if (params.type == 'warning') {
      iconColor = '#F1A756';
    }

    if (params.type == 'error') {
      iconColor = '#EA5B6D';
    }

    const htmlMessage = `<p>
      <i class="iconfont  ${iconClass}" style="color:${iconColor};"></i>
      <span>${params.txt}</span>
    </p>`;

    _this.$msgbox({
        title: params.title,
        customClass: `gm_confirm ${params.customClass || ''}`,
        dangerouslyUseHTMLString: true,
        message: htmlMessage,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        showClose: true,
        beforeClose: (action, instance, done) => {
          params.beforeClose(action, instance, done);
        }
      })
      .then(action => {
        resolve(action);
      })
      .catch(err => {
        reject(err);
      });
  });
}


/**
 * 打开confirmModal
 * @param params
 * @returns {Promise<any>}
 */
export function openInfoModal(_this, params) {
  return new Promise((resolve, reject) => {
    this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
      dangerouslyUseHTMLString: true
    });
  });
}



/**
 * 打开confirmModal
 * @param params
 * @returns {Promise<any>}
 */
export function openOnlyCfmModal(_this, params = {}) {
  return new Promise((resolve, reject) => {
    const htmlMessage = `
      <div style="padding:20px 0;">
        <div style="max-height:180px;overflow-y: auto;">
            <div style="word-wrap:break-word;" >
            ${params.txt}
            <div/>
        </div>
      </div>
    `;
    _this.$msgbox({
        title: params.title || '提醒',
        customClass: `gm_confirm ${params.customClass || ''}`,
        dangerouslyUseHTMLString: true,
        message: htmlMessage,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: '确定',
        closeOnClickModal: false,
        showClose: true,
        beforeClose: (action, instance, done) => {
          done();
          // params.beforeClose(action, instance, done);
        }
      })
      .then(action => {
        resolve(action);
      })
      .catch(err => {
        reject(err);
      });

    // _this.$alert('111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,111321323232放大范德萨发士大夫阿斯蒂芬阿斯蒂芬,', {
    //   confirmButtonText: '确定',
    //   callback: action => {

    //   }
    // });
  });
}
