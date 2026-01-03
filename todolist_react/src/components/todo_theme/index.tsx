import { useThemeStore } from '../../stores/useThemeStore'
import styles from './index.module.scss'

export default function Theme({isShow}){
  const selectTheme = useThemeStore(state => state.selectTheme)

  return (
    <div className={`${styles.theme} theme ${isShow? `${styles[`theme_show`]} theme_show` : ''}`}>
      <div className={`${styles.theme_box} theme_box`}>
        <div className={`${styles.theme_title} theme_title`}>点击切换主题颜色</div>
          <div className={`${styles.theme_content} theme_content`}>
            <ul>
              <li onClick={()=>selectTheme('blue')}><span style={{background: '#00b0f0'}}></span>#00b0f0</li>
              <li onClick={()=>selectTheme('green')}><span style={{background: '#00d1b2'}}></span>#00d1b2</li>
              <li onClick={()=>selectTheme('orange')}><span style={{background: '#f4b976'}}></span>#f4b976</li>
              <li onClick={()=>selectTheme('pink')}><span style={{background: '#f39894'}}></span>#f39894</li>
              <li onClick={()=>selectTheme('cyan')}><span style={{background: '#26b6be'}}></span>#26b6be</li>
            </ul>
          </div>
      </div>
    </div>
  )
} 