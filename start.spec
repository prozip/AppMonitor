# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['D:/code_files/Python_code/Project/AppMonitor/start.py'],
             pathex=['d:\\code_files\\Python_code\\Project\\AppMonitor'],
             binaries=[],
             datas=[('D:/code_files/Python_code/Project/AppMonitor/frontend', 'frontend/'), ('D:/code_files/Python_code/Project/AppMonitor/backend', 'backend/')],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='start',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=False,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False )
