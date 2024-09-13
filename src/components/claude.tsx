import React from 'react';
import { User, SparklesIcon, Award, Layers, Heart, QrCode } from 'lucide-react';

const PersonalCard = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* 头部信息 */}
        <div className="relative p-6 text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/400/400" alt="刘亦菲" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">刘亦菲</h1>
          <p className="text-gray-600">中国 · 美国</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">演员</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">歌手</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">国际影星</span>
          </div>
        </div>

        {/* 近期关键投入 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 mx-4 rounded-lg">
          <div className="flex items-center mb-2">
            <SparklesIcon className="w-5 h-5 text-pink-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">近期关键项目</h2>
          </div>
          <p className="text-gray-700">主演迪士尼真人版电影《花木兰》，扩大国际影响力</p>
        </div>

        {/* 履历亮点 */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">职业亮点</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>北京电影学院表演系2002级本科毕业</li>
            <li>凭《铜雀台》获第5届澳门国际电影节最佳女主角</li>
            <li>主演《金粉世家》《天龙八部》《神雕侠侣》等经典角色</li>
            <li>2008年出演好莱坞电影《功夫之王》，开启国际演艺之路</li>
          </ul>
        </div>

        {/* 擅长领域 */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Layers className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">专业领域</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-100 p-3 rounded">
              <h3 className="font-medium text-pink-800">影视表演</h3>
              <p className="text-sm text-gray-600">塑造多个深入人心的经典角色</p>
            </div>
            <div className="bg-purple-100 p-3 rounded">
              <h3 className="font-medium text-purple-800">歌唱事业</h3>
              <p className="text-sm text-gray-600">2005年进军歌坛，跨界音乐领域</p>
            </div>
            <div className="bg-blue-100 p-3 rounded">
              <h3 className="font-medium text-blue-800">国际影视</h3>
              <p className="text-sm text-gray-600">参与好莱坞制作，拓展全球市场</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded">
              <h3 className="font-medium text-indigo-800">品牌代言</h3>
              <p className="text-sm text-gray-600">多个国际知名品牌形象大使</p>
            </div>
          </div>
        </div>

        {/* 兴趣爱好 */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">兴趣爱好</h2>
          </div>
          <p className="text-gray-700">
            🎭 表演 | 🎤 唱歌 | 🎬 电影 | 🌏 旅行 | 📚 阅读
          </p>
        </div>

        {/* 页脚 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-b-xl flex justify-between items-center">
          <p className="text-sm text-gray-700 italic">"跨越文化，演绎精彩人生"</p>
          <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
            <QrCode className="w-10 h-10 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export{ PersonalCard}  ;