// AI Theme Colors - Gradienti blu-viola per tema AI
export const aiTheme = {
  // Gradients principali
  primaryGradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
  primaryGradientText: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  primaryGradientBg: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  
  // Gradients secondari
  secondaryGradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
  accentGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
  
  // Backgrounds colorati
  cardGradients: [
    'bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300',
    'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300',
    'bg-gradient-to-br from-indigo-100 to-blue-100 border-indigo-300',
    'bg-gradient-to-br from-violet-100 to-purple-100 border-violet-300',
    'bg-gradient-to-br from-cyan-100 to-teal-100 border-cyan-300',
    'bg-gradient-to-br from-pink-100 to-rose-100 border-pink-300'
  ],
  
  // Testi colorati
  textColors: [
    'text-blue-700',
    'text-purple-700', 
    'text-indigo-700',
    'text-violet-700',
    'text-cyan-700',
    'text-pink-700'
  ],
  
  // Colori accent
  accentColors: [
    'text-blue-600',
    'text-purple-600',
    'text-indigo-600', 
    'text-violet-600',
    'text-cyan-600',
    'text-pink-600'
  ],
  
  // Pulsanti AI
  aiButton: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
  aiButtonOutline: 'border-blue-200 text-blue-600 hover:bg-blue-50',
  
  // Card speciali
  aiCard: 'bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/50 backdrop-blur-sm',
  aiCardHover: 'hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300',
  
  // Icone AI
  aiIcon: 'text-blue-600',
  aiIconAccent: 'text-purple-600'
}

// Utility per ottenere colori ciclici
export const getCyclicColor = (index: number, colorArray: string[]) => {
  return colorArray[index % colorArray.length]
}
