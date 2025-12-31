import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 重定向到 GitHub 仓库下载
    const githubUrl = 'https://github.com/156554395/z-ai-skills/archive/refs/heads/main.zip'

    return NextResponse.redirect(githubUrl)
  } catch (error) {
    console.error('下载错误:', error)
    return NextResponse.json(
      { error: '下载失败' },
      { status: 500 }
    )
  }
}
